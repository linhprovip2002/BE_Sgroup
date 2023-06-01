import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.HOST,
  user: 'root',
  password: '',
  database: process.env.database
});

async function getUsers () {
  console.log('Getting all users...');
  try {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM users';
    const [rows] = await connection.query(query);
    console.log('Users: ', rows);
    connection.release();
    return rows;
  } catch (err) {
    console.log('Error retrieving users: ', err);
    throw err;
  }
}

const users = {
  getAll: async () => {
    try {
      const allUsers = await getUsers();
      console.log('All users: ', allUsers);
      return allUsers;
    } catch (err) {
      console.log('Error: ', err);
      return [];
    }
  }
};

export { users };
