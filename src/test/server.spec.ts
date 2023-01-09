import supertest from "supertest";
import app from "../server";
import { UserModel } from "../models/usersModel";
import { ProductModel } from "../models/productsModel";
import db from "../database";

const req = supertest(app);
let token = "";
const userModel = new UserModel();
const productModel = new ProductModel();

describe("Testing API endpoints", () => {
  // it("Get / Endpoint", async () => {
  //   const response = await req.get("/");
  //   expect(response.statusCode).toBe(200);
  // });
  const user = {
    username: "alam_othman",
    first_name: "Alam",
    last_name: "Othman",
    password: "MySuperSecurePassword",
  };
  beforeAll(async () => {
    const testUser = await userModel.createUser(user);
  });
  describe("Testing Users Endpoints", () => {
    it("test /create_user Endpoint [POST]", async () => {
      const response = await req
        .post("/create_user")
        .set("Content-Type", "application/json")
        .send({
          first_name: "Test Post",
          last_name: "User",
          username: "post_user",
          password: "password12",
        });
      token = response.body.token;
      expect(response.status).toBe(200);
      expect(response.body.username.first_name).toBe("Test Post");
      expect(response.body.username.last_name).toBe("User");
      expect(response.body.username.username).toBe("post_user");
    });

    it("Test /users Endpoint [GET]", async () => {
      const res = await req
        .get("/users")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    });

    it("Test /user/:id Endpoint [GET]", async () => {
      const res = await req
        .get("/user/2")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body.username).toBe("post_user");
      expect(res.body.first_name).toBe("Test Post");
      expect(res.body.last_name).toBe("User");
    });
  });
  describe("Testing Products Endpoints", () => {
    it("Testing /create_product Endpoint [POST]", async () => {
      const res = await req
        .post("/create_product")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + token)
        .send({
          name: "Product from API Test",
          price: 199,
          category: "1"
        });
        expect(res.body.name).toBe("Product from API Test")
    });

    it('Testing /products Endpoint [GET]', async () => {
      const res = await req.get('/products')
      expect(res.status).toBe(200)
    })

    it('Testing /product/:id Endpoint [GET]', async () => {
      const res = await req.get('/product/1')
      expect(res.status).toBe(200)
    })
  });

  afterAll(async () => {
    const conn = await db.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
    await conn.query(sql);
    conn.release();
  });
});
