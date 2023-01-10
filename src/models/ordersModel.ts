import db from "../database";

/*
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
*/

export type Order = {
  id?: number;
  order_id?: number;
  username?: string;
  product_id: number;
  product_name?: string;
  quantity: number;
  user_id?: number;
  order_status?: string;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    const conn = await db.connect();
    // const sql = "SELECT * FROM orders";
    const sql =
      "SELECT orders.id, orders.user_id, users.username, order_status.status_name AS order_status FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN order_status ON orders.status = order_status.id;";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<Order[]> {
    try {
      const conn = await db.connect();
      // const sql = "SELECT * FROM orders WHERE orders.id = $1";
      const sql =
        "SELECT order_products.id, order_products.order_id, orders.user_id, users.username, order_products.product_id, products.name AS product_name, order_products.quantity, order_status.status_name AS order_status FROM order_products INNER JOIN products ON order_products.product_id = products.id INNER JOIN orders ON order_products.order_id = orders.id INNER JOIN users ON orders.user_id = users.id INNER JOIN order_status ON orders.status = order_status.id WHERE order_products.order_id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot view order ${err}`);
    }
  }

  async initOrder(user: number, status: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [user, status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Create a new order ${err}`);
    }
  }

  async addOrder(order: Order): Promise<Order> {
    try {
      const initOrder = await this.initOrder(order.user_id as number, 1);
      try {
        const currentOrder = initOrder.id;
        const conn = await db.connect();
        const sql =
          "INSERT INTO order_products (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [
          order.product_id,
          currentOrder,
          order.quantity,
        ]);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot create a new order ${err}`);
      }
    } catch (err) {
      throw new Error(`Cannot initiate order ${err}`);
    }
  }
  async addItem(order_id: number, details: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO order_products (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        details.product_id,
        order_id,
        details.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add items to order ${err}`);
    }
  }

  async editItem(order_id: number, details: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql =
        "UPDATE order_products SET product_id = $1, quantity = $2 WHERE id = $3 AND order_id = $4 RETURNING *";
      const result = await conn.query(sql, [
        details.product_id,
        details.quantity,
        details.id,
        order_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update item on order ${err}`);
    }
  }

  async deleteItem(order_id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM order_products WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot remove item from order ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const ordProdSql =
        "DELETE FROM order_products WHERE order_id = $1 RETURNING *";
      const ordProdResult = await conn.query(ordProdSql, [id]);
      if (ordProdResult.rows.length) {
        const ordSql = "DELETE FROM orders WHERE id = $1 RETURNING *";
        const ordResult = await conn.query(ordSql, [id]);
        conn.release();
        return ordResult.rows[0];
      }
      conn.release();
      throw new Error(`No Order to delete`);
    } catch (err) {
      throw new Error(`Cannot delete order ${err}`);
    }
  }
}
