const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '291998Bernardo',
    database: 'ecommerce_management',

});


module.exports.query = (sql, args, callback) => {
    connection.query(sql, args, callback);
};




connection.connect((err) => {
    if (err) {
        console.error('An error occurred while connecting to the DB:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;