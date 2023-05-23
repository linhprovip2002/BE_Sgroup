const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 's-group',
  connectionLimit: 10 // Set the maximum number of connections in the pool
});

// Example query using the pool
pool.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }

  // Process the query results
  console.log(results);
});

// Close the pool when no longer needed
// pool.end();
