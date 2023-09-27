const db = require('../db.js');


const createOrder = (userID, callback) => {
    const sql = "INSERT INTO `order` (userID, totalAmount) VALUES (?, 0)"; // Start with totalAmount of 0
    db.query(sql, [userID], callback);
};



//update order status 
const updateOrderStatus = (orderID, status, callback) => {
    const sql = "UPDATE `order` SET status = ? WHERE orderID = ?";
    db.query(sql, [status, orderID], callback);
};

//add product to order 
const addProductToOrder = (orderID, productID, quantity, callback) => {
    const fetchProductDetails = "SELECT price, quantityInStock FROM `product` WHERE productID = ?";

    db.query(fetchProductDetails, [productID], (err, results) => {
        if (err) return callback(err);

        // Check if product exists and there's enough stock
        if (results.length === 0 || results[0].quantityInStock < quantity) {
            return callback(new Error('Product not found or not enough stock'));
        }

        const productPrice = results[0].price;
        const total = productPrice * quantity;  // Calculate total for the product
        const updateQuantityInStock = results[0].quantityInStock - quantity;

        const sql = "INSERT INTO `orderdetails` (orderID, productID, quantity, price, total) VALUES (?, ?, ?, ?, ?)";

        db.beginTransaction(err => {
            if (err) return callback(err);

            db.query(sql, [orderID, productID, quantity, productPrice, total], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                const updateProductStockSql = "UPDATE `product` SET quantityInStock = ? WHERE productID = ?";
                db.query(updateProductStockSql, [updateQuantityInStock, productID], (err) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    // Update the order's total amount
                    updateOrderTotal(orderID, err => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }

                        db.commit(callback);
                    });
                });
            });
        });
    });
};


//get orders by user
const getOrdersByUser = (userID, callback) => {
    const sql = "SELECT * FROM `order` WHERE userID = ?";
    db.query(sql, [userID], callback);
};


// Get products for an order
const getOrderDetails = (orderID, callback) => {
    const sql = `
        SELECT p.name, od.quantity, od.price, od.total
        FROM \`orderdetails\` od
        JOIN \`product\` p ON od.productID = p.productID
        WHERE od.orderID = ?;
    `;
    db.query(sql, [orderID], callback);
};


//remove a product from an order
const removeProductFromOrder = (orderID, productID, callback) => {
    // Fetch the total for the product being removed
    const fetchProductTotal = "SELECT total FROM `orderdetails` WHERE orderID = ? AND productID = ?";

    // Deduct this total from the order's totalAmount
    const deductFromOrderTotal = "UPDATE `order` SET totalAmount = totalAmount - ? WHERE orderID = ?";

    // Delete the product from the order
    const sql = "DELETE FROM `orderdetails` WHERE orderID = ? AND productID = ?";

    db.beginTransaction(err => {
        if (err) return callback(err);

        db.query(fetchProductTotal, [orderID, productID], (err, results) => {
            if (err || results.length === 0) {
                return db.rollback(() => callback(err || new Error('Product not found in the order')));
            }

            const productTotal = results[0].total;

            db.query(deductFromOrderTotal, [productTotal, orderID], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                db.query(sql, [orderID, productID], (err) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    db.commit(callback);
                });
            });
        });
    });
};

//Delete an entire order 
const deleteOrder = (orderID, callback) => {
    // First, we'll delete the order details associated with the order
    const sqlDeleteDetails = "DELETE FROM `orderdetails` WHERE orderID = ?";

    // Then, delete the order itself
    const sqlDeleteOrder = "DELETE FROM `order` WHERE orderID = ?";

    db.beginTransaction(err => {
        if (err) return callback(err);

        db.query(sqlDeleteDetails, [orderID], (err) => {
            if (err) {
                return db.rollback(() => callback(err));
            }

            db.query(sqlDeleteOrder, [orderID], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                db.commit(callback);
            });
        });
    });
};

// update total amount in an order
const updateOrderTotal = (orderID, callback) => {
    const sql = `
        UPDATE \`order\` o 
        SET o.totalAmount = (
            SELECT SUM(od.total) FROM \`orderdetails\` od WHERE od.orderID = o.orderID
        ) WHERE o.orderID = ?;
    `;
    db.query(sql, [orderID], callback);
};






module.exports = {
    createOrder,
    updateOrderStatus,
    getOrdersByUser,
    getOrderDetails,
    removeProductFromOrder,
    addProductToOrder,
    deleteOrder




};