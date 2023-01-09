import { ProductModel } from "../../models/productsModel";
import db from "../../database";

const productModel = new ProductModel();

describe("Products Model Testing", () => {
  describe("Products model class objects existence", () => {
    it("Check for index model", () => {
      expect(productModel.index).toBeDefined();
    });
    it("Check for create model", () => {
      expect(productModel.create).toBeDefined();
    });
    it("Check for show model", () => {
      expect(productModel.show).toBeDefined();
    });
  });
  describe("Products models functionality", () => {
    const product = {
      name: "Test Product",
      price: 50,
      category: "1",
    };
    beforeAll(async () => {
      await productModel.create(product);
    });

    it("Testing Create a new product model", async () => {
      const createProd = await productModel.create(product);
      expect(createProd.name).toBe("Test Product");
      expect(createProd.price).toBe(50);
      expect(createProd.category).toBe(1 as unknown as string);
    });

    it("Testing list a single product model", async () => {
      const listProd = await productModel.show(1 as unknown as string);
      expect(listProd.id).toBe(1);
      expect(listProd.name).toBe("Test Product");
    });

    it("Testing list all products", async () => {
      const listProds = await productModel.index();
      expect(listProds.length).toBe(2);
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql =
        "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1";
      await conn.query(sql);
      conn.release();
    });
  });
});
