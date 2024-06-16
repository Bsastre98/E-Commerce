const db = require('../db.js');


// Create new payment
const createPaymentFromOrder = (orderID, userID, paymentMethod, callback) => {
    const sqlGetTotalAmount = "SELECT totalAmount FROM `order` WHERE orderID = ?";

    db.query(sqlGetTotalAmount, [orderID], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        const totalAmount = result[0].totalAmount;
        const sqlInsertPayment = "INSERT INTO `payment` (orderID, userID, paymentMethod, totalAmount) VALUES (?, ?, ?, ?)";
        db.query(sqlInsertPayment, [orderID, userID, paymentMethod, totalAmount], callback);
    });
};



//Retrieve payment by ID
const getPaymentByID = (paymentID, callback) => {
    const sql = "SELECT * FROM `payment` WHERE paymentID = ?";
    db.query(sql, [paymentID], callback);
};


//Update payment status
const updatePaymentStatus = (paymentID, status, callback) => {
    const sql = "UPDATE `payment` SET paymentStatus = ? WHERE paymentID = ?";
    db.query(sql, [status, paymentID], callback);
};


//delete a payment
const deletePayment = (paymentID, callback) => {
    const sql = "DELETE FROM `payment` WHERE paymentID = ?";
    db.query(sql, [paymentID], callback);
};


module.exports = {
    createPaymentFromOrder,
    getPaymentByID,
    updatePaymentStatus,
    deletePayment


};