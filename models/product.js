const db = require('../db.js');

//Function to create a new product
const createProduct = (product, callback) => {
    const sql = "INSERT INTO Product SET ?";
    db.query(sql, product, callback);
};


// Function to get all products
const getAllProducts = (callback) => {
    const sql = 'SELECT * FROM Product';
    db.query(sql, callback);
};

//function to get product by id
const getProductById = (productId, callback) => {
    const sql = "SELECT * FROM Product WHERE productID = ?";
    db.query(sql, [productId], callback);
};

//function to update product by id
const updateProduct = (productId, productDetails, callback) => {
    const sql = "UPDATE Product SET ? WHERE productID = ?";
    db.query(sql, [productDetails, productId], callback);
};


//function to delete product
const deleteProduct = (productId, callback) => {
    const sql = "DELETE FROM Product WHERE productID = ?";
    db.query(sql, [productId], callback);
};


//search product by name
const searchProductsByName = (productName, callback) => {
    const sql = "SELECT * FROM Product WHERE name LIKE ?";
    db.query(sql, [`%${productName}%`], callback);
};







module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductsByName

};
