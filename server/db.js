const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"",
    user:,
    password:,
    database:,
});

connection.connect((err) => {
    if (err) throw err;
    console.log ('Connected to MySql Database');
});

module.exports = connection;
