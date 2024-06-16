const db = require('../db.js');






//Add payment details
const addPaymentDetails = (paymentID, cardName, cardNumber, expiryDate, cvv, callback) => {
    const sql = "INSERT INTO `paymentDetails` (paymentID, cardName, cardNumber, expiryDate, cvv) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [paymentID, cardName, cardNumber, expiryDate, cvv], callback);
};

//Retrieve payment details by payment id
const getPaymentDetailsByPaymentID = (paymentID, callback) => {
    const sql = "SELECT * FROM `paymentDetails` WHERE paymentID = ?";
    db.query(sql, [paymentID], callback);
};


//update payment details
const updatePaymentDetails = (paymentDetailsID, cardName, cardNumber, expiryDate, cvv, callback) => {
    const sql = "UPDATE `paymentDetails` SET cardName = ?, cardNumber = ?, expiryDate = ?, cvv = ? WHERE paymentDetailsID = ?";
    db.query(sql, [cardName, cardNumber, expiryDate, cvv, paymentDetailsID], callback);
};


//delete payment details
const deletePaymentDetails = (paymentDetailsID, callback) => {
    const sql = "DELETE FROM `paymentDetails` WHERE paymentDetailsID = ?";
    db.query(sql, [paymentDetailsID], callback);
};



module.exports = {
    addPaymentDetails,
    getPaymentDetailsByPaymentID,
    updatePaymentDetails,
    deletePaymentDetails

};