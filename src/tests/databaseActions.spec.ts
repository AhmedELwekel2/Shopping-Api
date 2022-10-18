import pool from '../database';

describe('testing database Actions', () => {
  let userId: number;
  it('expect to create user in the database ', async () => {
    const conn = await pool.connect();
    const sql =
      'insert into users (username,firstname,lastname,password_digest) values ($1,$2,$3,$4) returning *';
    const result = await conn.query(sql, [
      'AhmedElwekel',
      'Ahmed',
      'Elwekel',
      '123',
    ]);
    conn.release();
    expect(result.rows[0].username).toEqual('AhmedElwekel');
    userId = result.rows[0].id;
  });
  it('expects to get user from the database ', async () => {
    const conn = await pool.connect();
    const sql = `SELECT * from users WHERE id=$1 `;
    const result = await conn.query(sql, [userId]);
    conn.release();
    expect(result.rows[0].username).toEqual('AhmedElwekel');
  });
  it('expects to update user in the database ', async () => {
    const conn = await pool.connect();
    const sql = 'update users set firstname=$1 where username=$2   returning *';
    const result = await conn.query(sql, ['omar', 'AhmedElwekel']);
    conn.release();
    expect(result.rows[0].firstname).toEqual('omar');
  });

  it('expects to delete user from the database ', async () => {
    const conn = await pool.connect();
    const sql = `DELETE  FROM users where id=$1 `;
    await conn.query(sql, [userId]);
    conn.release();
  });
});
