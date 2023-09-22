const db = require('../db.js');

//Function to create a new product
const createProduct = (product, callback) => {
    const sql = "INSERT INTO Product SET ?";
    db.query(sql, product, callback);
};



module.exports = {
    createProduct



};
