const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config('.env')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: '',
    database: process.env.database,
});
connection.connect((err) => {
    if (err) {
        console.log('connect to DB unsuccessful');
    } else {
        console.log(process.env.HOST,process.env.database)
        console.log('connect to DB successful');
    }
});
module.exports = connection;
