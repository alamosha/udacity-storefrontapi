import db from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await db.connect();
      //   const sql = "SELECT id, name, price, category FROM products";
      const sql =
        "SELECT products.id, products.name, products.price, categories.category_name as category FROM products INNER JOIN categories ON products.category_id = categories.id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot list products ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING name, price, category_id as category";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add product ${product.name}: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT id, name, price, category_id FROM products WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot select Product with ID ${id}: ${err}`);
    }
  }

  async updateProduct(prod: Product, id: number):Promise<Product>{
    try {
      const conn = await db.connect();
      const initSql =
        "SELECT name, price, category_id FROM products WHERE id = $1";
      const initResult = await conn.query(initSql, [id]);

      const prodName = prod.name || initResult.rows[0].name;
      const prodPrice = prod.price || initResult.rows[0].price;
      const category = prod.category || initResult.rows[0].category_id;
      const sql = 'UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING name, price, category_id'
      const result = await conn.query(sql, [prodName, prodPrice, category, prod.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Update Product with ID ${id}: ${err}`);
    }
  }

  async deleteProduct(id: number):Promise<Product>{
    try {
      const conn = await db.connect()
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING name'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
      
    } catch (err) {
      throw new Error (`Cannot Delete product ${err}`)
    }
  }
}
