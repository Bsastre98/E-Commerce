const db = require('../db.js');

// Create a new cart for a user
const createCart = (userID, callback) => {
    const sql = "INSERT INTO Carts (userID) VALUES (?)";
    db.query(sql, [userID], (err, results) => {
        if (err) {
            // Check for duplicate entry error
            if (err.errno === 1062) {
                return callback(new Error('A user can only have one cart.'), null);
            }
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Get cart by userID
const getCartByUserID = (userID, callback) => {
    const sql = "SELECT * FROM Carts WHERE userID = ?";
    db.query(sql, [userID], callback);
};

// Add product to cart or update its quantity
const addOrUpdateProduct = (cartID, productID, quantity, callback) => {
    const sql = `
        INSERT INTO CartItems (cartID, productID, quantity) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
    `;
    db.query(sql, [cartID, productID, quantity], callback);
};
// Gets items in cart by cart id 
const getItemsByCartID = (cartID, callback) => {
    const sql = `
        SELECT p.productID, p.name, ci.quantity 
        FROM CartItems ci
        JOIN Product p ON ci.productID = p.productID
        WHERE ci.cartID = ?;
    `;
    db.query(sql, [cartID], callback);
};

// Remove a product from a cart
const removeProduct = (cartID, productID, callback) => {
    const sql = "DELETE FROM CartItems WHERE cartID = ? AND productID = ?";
    db.query(sql, [cartID, productID], callback);
};

// Clear all items from a cart
const clearCart = (cartID, callback) => {
    const sql = "DELETE FROM CartItems WHERE cartID = ?";
    db.query(sql, [cartID], callback);
};

module.exports = {
    createCart,
    getCartByUserID,
    addOrUpdateProduct,
    getItemsByCartID,
    removeProduct,
    clearCart
};