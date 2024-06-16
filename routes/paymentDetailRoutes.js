const express = require('express');
const router = express.Router();
const paymentDetails = require('../models/paymentDetails.js');

// Add Payment Detail
router.post('/add', (req, res) => {
    const { paymentID, cardName, cardNumber, expiryDate, cvv } = req.body;
    paymentDetails.addPaymentDetails(paymentID, cardName, cardNumber, expiryDate, cvv, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error adding payment detail", error: err });
        } else {
            res.status(201).send({ message: "Payment detail added successfully", data: results });
        }
    });
});


// Retrieve Payment Detail by Payment ID
router.get('/paymentDetails/:paymentID', (req, res) => {
    const paymentID = req.params.paymentID;
    paymentDetails.getPaymentDetailsByPaymentID(paymentID, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving payment detail", error: err });
        } else {
            res.status(200).send({ message: "Payment detail retrieved successfully", data: results });
        }
    });
});

// Update Payment Detail by Payment ID
router.put('/updatePaymentDetail/:paymentDetailsID', (req, res) => {
    const paymentDetailsID = req.params.paymentDetailsID;
    const { cardName, cardNumber, expiryDate, cvv } = req.body;
    paymentDetails.updatePaymentDetails(paymentDetailsID, cardName, cardNumber, expiryDate, cvv, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error updating payment detail", error: err });
        } else {
            res.status(200).send({ message: "Payment detail updated successfully", data: results });
        }
    });
});

// Delete Payment Detail by PaymentDetailsID
router.delete('/deletepaymentDetails/:paymentDetailsID', (req, res) => {
    const paymentDetailsID = req.params.paymentDetailsID;

    paymentDetails.deletePaymentDetails(paymentDetailsID, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error deleting payment detail", error: err });
        } else if (results.affectedRows == 0) { // No record was deleted
            res.status(404).send({ message: "No payment detail found with the provided ID" });
        } else {
            res.status(200).send({ message: "Payment detail deleted successfully", data: results });
        }
    });
});

module.exports = router;
