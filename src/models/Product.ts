import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type product = {
  name: string;
  price: string;
  category: string;
};

export type returnProduct = {
  id: number;
  name: string;
  price: string;
  category: string;
};

export class products {
  async index(): Promise<returnProduct[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  async show(id: number): Promise<returnProduct> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT * from products WHERE id=$1 `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async create(p: product): Promise<returnProduct> {
    try {
      if (await this.productExist(p.name)) {
        throw 'the product  you tryin to add is already existed';
      }

      const conn = await pool.connect();
      const sql =
        'insert into products (name,price,category) values ($1,$2,$3) returning *';
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async productExist(name: string) {
    try {
      const conn = await pool.connect();
      const sql = 'select * from products where name=$1';
      const result = await conn.query(sql, [name]);
      conn.release();
      if (result.rows[0].name) {
        return true;
      } else return false;
    } catch (err) {}
  }
  async delete(): Promise<void> {
    try {
      const conn = await pool.connect();
      const sql = 'delete from products ';
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      const conn = await pool.connect();
      const sql = `DELETE  FROM products where id=$1 `;
      await conn.query(sql, [id]);
      conn.release();
    } catch (err) {
      throw err;
    }
  }
  async getOne(name: string) {
    try {
      const conn = await pool.connect();
      const sql = 'select * from products where name=$1';
      const result = await conn.query(sql, [name]);
      conn.release();
      if (!result.rows[0].name) {
        return;
      }

      return result.rows[0];
    } catch (err) {
      throw 'the product you tryin to delete is not existed';
    }
  }
  async getByCategory(category: string) {
    try {
      const conn = await pool.connect();
      const sql = 'select * from products where category=$1';
      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw `there is no products with category:${category}`;
    }
  }
}
