const express = require('express')
const app = express()
const port = 3000
const route = require('./router/index')
app.use(express.json())

const swaggerUi = require('swagger-ui-express');



route(app);
const swaggerDocument = require('./swagger.json');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app