const express = require('express')
const app = express()
const port = 3000
const route = require('./router/index')
const db = require('./config/db/index')
app.use(express.json())
// const dotenv = require('dotenv')
// dotenv.config()

// connect db
console.log();
db.connect;

const swaggerUi = require('swagger-ui-express');



route(app);
const swaggerDocument = require('./swagger.json');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app