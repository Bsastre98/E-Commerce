const express = require('express');
const router = express.Router();
const payment = require('../models/payment.js');

// Create Payment
router.post('/create-payment', (req, res) => {
    const orderID = req.body.orderID;
    const userID = req.body.userID;
    const paymentMethod = req.body.paymentMethod;

    if (!orderID || !userID || !paymentMethod) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
    }

    payment.createPaymentFromOrder(orderID, userID, paymentMethod, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Database error.', error });
            return;
        }

        res.status(201).json({ message: 'Payment created.', paymentID: results.insertId });
    });
});

// Retrieve Payment by ID
router.get('/payment/:paymentID', (req, res) => {
    const paymentID = req.params.paymentID;
    payment.getPaymentByID(paymentID, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving payment", error: err });
        } else {
            res.status(200).send({ message: "Payment retrieved successfully", data: results });
        }
    });
});

// Update Payment Status
router.put('/updateStatus/:paymentID', (req, res) => {
    const paymentID = req.params.paymentID;
    const { status } = req.body;
    payment.updatePaymentStatus(paymentID, status, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error updating payment status", error: err });
        } else {
            res.status(200).send({ message: "Payment status updated successfully", data: results });
        }
    });
});

// Delete a Payment
router.delete('/:paymentID', (req, res) => {
    const paymentID = req.params.paymentID;
    payment.deletePayment(paymentID, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error deleting payment", error: err });
        } else {
            res.status(200).send({ message: "Payment deleted successfully", data: results });
        }
    });
});

module.exports = router;