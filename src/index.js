/* eslint-disable semi */
import express from 'express';
import route from './route/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import errorHandler from './middleware/errorHandling';
import { json } from 'body-parser';
// import { users } from '../index';
const app = express();

// connect();

app.use(json())

route(app);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.json({ status: true, message: 'Our node.js app works' })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
