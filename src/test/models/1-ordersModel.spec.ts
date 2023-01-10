import { OrderModel } from "../../models/ordersModel";
import { ProductModel } from "../../models/productsModel";
import { UserModel } from "../../models/usersModel";
import db from "../../database";

const orderModel = new OrderModel();
const productModel = new ProductModel();
const userModel = new UserModel();

describe("Orders Model Testing", () => {
  describe("Orders model class objects existence", () => {
    it("check for Index model", () => {
      expect(orderModel.index).toBeDefined();
    });
    it("check for show model", () => {
      expect(orderModel.show).toBeDefined();
    });
    it("check for initOrder model", () => {
      expect(orderModel.initOrder).toBeDefined();
    });
    it("check for addOrder model", () => {
      expect(orderModel.addOrder).toBeDefined();
    });
    it("check for addItem model", () => {
      expect(orderModel.addItem).toBeDefined();
    });
    it("check for editItem model", () => {
      expect(orderModel.editItem).toBeDefined();
    });
    it("check for deleteItem model", () => {
      expect(orderModel.deleteItem).toBeDefined();
    });
    it("check for deleteOrder model", () => {
      expect(orderModel.deleteOrder).toBeDefined();
    });
  });

  describe("Orders models functionality", () => {
    beforeAll(async () => {
      await userModel.createUser({
        first_name: "Alam",
        last_name: "Othman",
        username: "alam_othman",
        password: "password123",
      });
      await productModel.create({
        name: "test prod.",
        price: 50,
        category: "1",
      });
    });
    it("Test creating a new order", async () => {
      const order = {
        user_id: 1,
        product_id: 1,
        quantity: 50,
      };
      const add = await orderModel.addOrder(order);
      expect(add.quantity).toBe(50);
    });
    it("Test listing orders", async () => {
      const orders = await orderModel.index();
      expect(orders.length).toBe(1);
    });
    it("Test list order with id", async () => {
      const order = await orderModel.show(1);
      expect(order[0].quantity).toBe(50);
    });
    it("Test add items to order", async () => {
      const item = await orderModel.addItem(1, { product_id: 1, quantity: 90 });
      expect(item.quantity).toBe(90);
    });
    it("Test delete order", async () => {
      const order = await orderModel.deleteOrder(1)
      expect(order.id).toBe(1);
    });
  });

  afterAll(async () => {
    const conn = await db.connect();
    const sql1 =
      "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1";
    const sql2 =
      "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1";
    const sql3 =
      "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1";
    const sql4 =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
    await conn.query(sql1);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);
    conn.release();
  });

  // describe("Orders models functionality", () => {
  //   const order = {
  //     product_id: 1,
  //     quantity: 50,
  //     user_id: 3,
  //     order_id: 1,
  //   };
  //   const user = {
  //     username: "alam_othman_orders",
  //     first_name: "Alam",
  //     last_name: "Othman",
  //     password: "MySuperSecurePassword",
  //   };
  //   beforeAll(async () => {
  //     await userModel.createUser(user);
  //   });

  //   it("Testing add a new order", async () => {
  //     const add = await orderModel.addOrder(order);
  //     expect(add.id).toBe(1);
  //   });

  //   it("Testing add new items to current order", async () => {
  //     const add = await orderModel.addItem(1, order);
  //     expect(add.product_id).toBe(1);
  //     expect(add.order_id).toBe(1);
  //   });

  //   afterAll(async () => {
  //     const conn = await db.connect();
  //     const sql =
  //       "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
  //     await conn.query(sql);
  //     conn.release();
  //   });
  // });
});
