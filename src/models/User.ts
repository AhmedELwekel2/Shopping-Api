import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type user = {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export type returnUser = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class users {
  async create(u: user): Promise<returnUser> {
    try {
      const peper = process.env.BCRYPT_PASSWORD as string;
      const salt = process.env.SALT_ROUNDS as string;

      if (await this.userExist(u.username)) {
        throw 'the username is already taken please try another username';
      }

      const hashedPassword = bcrypt.hashSync(
        u.password + peper,
        parseInt(salt)
      );
      const conn = await pool.connect();
      const sql =
        'insert into users (username,firstname,lastname,password_digest) values ($1,$2,$3,$4) returning *';
      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async userExist(username: string) {
    try {
      const conn = await pool.connect();
      const sql = 'select * from users where username=$1';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows[0].username) {
        return true;
      } else return false;
    } catch (err) {}
  }

  async index(): Promise<returnUser[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async show(userId: number): Promise<returnUser> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT * from users WHERE id=$1 `;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(): Promise<void> {
    try {
      const conn = await pool.connect();
      const sql = 'delete from users ';
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      const conn = await pool.connect();
      const sql = `DELETE  FROM users where id=$1 `;
      await conn.query(sql, [id]);
      conn.release();
    } catch (err) {
      throw err;
    }
  }
  async getOne(username: string) {
    try {
      const conn = await pool.connect();
      const sql = 'select * from users where username=$1';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (!result.rows[0].username) {
        return;
      }

      return result.rows[0];
    } catch (err) {
      throw 'incorrect username or password';
    }
  }
}
