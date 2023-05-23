import mysql from 'mysql';
import { promisify } from 'util';
import env from 'dotenv';
env.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: 'root',
  password: '',
  database: process.env.database
});

// Use promisify to wrap the pool.query method in a promise
pool.query = promisify(pool.query);

export default pool;
