import { Pool } from 'pg';
import * as dotenv from 'dotenv';


dotenv.config();
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database:process.env.ENV=='dev' ?  process.env.DATABASE_dev :process.env.DATABASE_test,
  password: process.env.USER_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT as string),
});

export default pool;
