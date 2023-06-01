/* eslint-disable semi */
import express from 'express';
import route from './route/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import errorHandler from './middleware/errorHandling';
import { json } from 'body-parser';
// import poolKnex  from './config/knex'
// import pool from './config/db'

// import { users } from '../index';
const app = express();

// console.log(pool);
// pool.query('SELECT * FROM users', (err, rows) => {
//   if (err) throw err;
//   else console.log(rows);
// });
// console.log(poolKnex);
// poolKnex('users').select('*').then((rows) => {
//   console.log(rows);
// }).catch((err) => {
//   console.log(err);
// });

app.use(json())

route(app);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.json({ status: true, message: 'Our node.js app works' })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
