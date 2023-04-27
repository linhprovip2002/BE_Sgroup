import express, { json } from 'express';
import pool from './config/db'; // modify import statement
import route from './route/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
const app = express();

app.use(json())

async function connect()
{
    try
    {
        await pool.query("SELECT 1 + 1 AS solution");
        console.log("Connected to the database");
    }
    catch(err)
    {
        console.log("Error connecting to the database: ", err);
    }
}
connect();

route(app);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
