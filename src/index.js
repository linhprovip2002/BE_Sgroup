/* eslint-disable semi */
import express from 'express';
import route from './route/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import errorHandler from './middleware/errorHandling';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json())

route(app);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.json({ status: 200, message: 'Our node.js app works' })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
