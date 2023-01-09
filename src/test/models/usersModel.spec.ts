import { UserModel } from "../../models/usersModel";
import db from "../../database";

const userModel = new UserModel();
describe("Users Model Testing", () => {
  describe("Users model class objects existence", () => {
    it("Check for index model", () => {
      expect(userModel.index).toBeDefined();
    });
    it("Check for create new user model", () => {
      expect(userModel.createUser).toBeDefined();
    });
    it("Check for get a single user model", () => {
      expect(userModel.show).toBeDefined();
    });
  });

  describe("Users models functionality", () => {
    const user = {
      username: "alam_othman",
      first_name: "Alam",
      last_name: "Othman",
      password: "MySuperSecurePassword",
    };
    beforeAll(async () => {
      const testUser = await userModel.createUser(user);
    });

    it("Testing Create User model", async () => {
      const secondUser = {
        username: "test_user",
        first_name: "Test",
        last_name: "User",
        password: "MySuperSecurePassword",
      };
      const createdUser = await userModel.createUser(secondUser);
      expect(createdUser.id).toBe(2);
      expect(createdUser.username).toBe("test_user");
      expect(createdUser.first_name).toBe("Test");
      expect(createdUser.last_name).toBe("User");
    });
    it("testing index users model", async () => {
      const indexUsers = await userModel.index();
      expect(indexUsers.length).toBe(2);
    });
    it("testing Show users model", async () => {
      const showUsers = await userModel.show("1");
      expect(showUsers.first_name).toBe("Alam");
      expect(showUsers.last_name).toBe("Othman");
      expect(showUsers.username).toBe("alam_othman");
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql =
        "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
      await conn.query(sql);
      conn.release();
    });
  });
});
