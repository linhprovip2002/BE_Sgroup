import knex from 'knex';

const config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: process.env.database
  },
  pool: {
    min: 2,
    max: 10
  }
};
const poolKnex = knex(config);

export default poolKnex;
