import db from "../database";

export type Category = {
  id?: number;
  category_name: string;
};

export class CategoryModel {
  async index(): Promise<Category[]> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM categories";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot list categories order ${err}`);
    }
  }
  async show(id: number): Promise<Category> {
    try {
      const conn = await db.connect();
      const sql = "SELECT * FROM categories WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot view category ${err}`);
    }
  }
  async editCategory(id: number, cat: string):Promise<Category>{
    try {
        const conn = await db.connect()
        const sql = 'UPDATE categories SET category_name = $2 WHERE id = $1 RETURNING *'
        const result = await conn.query(sql, [id, cat])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot edit category ${err}`);
    }
  }

  async addCategory(category:string):Promise<Category> {
    try {
        const conn = await db.connect()
        const sql = 'INSERT INTO categories (category_name) VALUES ($1) RETURNING *'
        const result = await conn.query(sql,[category])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot create category ${err}`);
    }
  }

  async deleteCategory(id: number):Promise<Category>{
    try {
        const conn = await db.connect()
        const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *'
        const result = await conn.query(sql,[id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot delete category ${err}`);
    }
  }
}
