import db from "../database";
import creds from "../creds";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      // const sql = 'SELECT * FROM users';
      const sql = "SELECT id, username, first_name, last_name FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to list users ${err}`);
    }
  }
  async createUser(user: User): Promise<User> {
    try {
      const conn = await db.connect();
      const hashPassword = bcrypt.hashSync(
        user.password + creds.bcryptPass,
        parseInt(creds.saltRounds as string)
      );
      const sql =
        "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name";
      const result = await conn.query(sql, [
        user.username,
        user.first_name,
        user.last_name,
        hashPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create a new user ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT id, username, first_name, last_name FROM users WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`User with id ${id} cannot be found.`);
    }
  }

  async updateUser(user: User): Promise<User | null> {
    try {
      if (!user.username) {
        return null;
      }
      const conn = await db.connect();
      const initSql =
        "SELECT id, first_name, last_name FROM users WHERE username = $1";
      const initResult = await conn.query(initSql, [user.username]);

      const userName = user.username;
      const firstName = user.first_name || initResult.rows[0].first_name;
      const lastName = user.last_name || initResult.rows[0].last_name;
      let sql;
      let sqlQuery = [];
      if (user.password) {
        const hashPassword = bcrypt.hashSync(
          user.password + creds.bcryptPass,
          parseInt(creds.saltRounds as string)
        );
        sql =
          "UPDATE users SET first_name = $1, last_name = $2, password = $4 WHERE username = $3 RETURNING username, first_name, last_name";
        sqlQuery = [firstName, lastName, userName, hashPassword];
      } else {
        sql =
          "UPDATE users SET first_name = $1, last_name = $2 WHERE username = $3 RETURNING username, first_name, last_name";
        sqlQuery = [firstName, lastName, userName];
      }
      const result = await conn.query(sql, sqlQuery);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update user ${err}`);
    }
  }

  async deleteUser (usermane: string):Promise<User> {
    try {
      const conn = await db.connect()
      const sql = 'DELETE FROM users WHERE username = $1 RETURNING username, first_name, last_name'
      const result = await conn.query(sql, [usermane])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error (`Cannot Delete user ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await db.connect();
      const sql = "SELECT password FROM users WHERE username = $1";
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const validatePassword = bcrypt.compareSync(
          (password + creds.bcryptPass) as string,
          result.rows[0].password as string
        );
        if (validatePassword) {
          const validateSql =
            "SELECT id, username, first_name, last_name FROM users WHERE username = $1";
          const validateResult = await conn.query(validateSql, [username]);
          return validateResult.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`An error occured during authentication ${err}`);
    }
  }
}
