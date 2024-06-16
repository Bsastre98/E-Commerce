const express = require('express');
const router = express.Router();
const ordersModel = require('../models/orders');



//Create a new order
router.post('/create-order', (req, res) => {
    const { userID } = req.body;
    ordersModel.createOrder(userID, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ orderId: results.insertId });
    });
});

// Route to add a product to an order
router.post('/add-product/:orderId', (req, res) => {
    const { productID, quantity } = req.body;
    const orderId = req.params.orderId;
    ordersModel.addProductToOrder(orderId, productID, quantity, (err) => {
        if (err) {
            // Handle specific error for not enough stock or product not found
            if (err.message === 'Product not found or not enough stock') {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product added to order' });
    });
});


// Route to update order status
router.put('/updateOrderStatus/:orderId', (req, res) => {
    const { status } = req.body;
    const orderId = req.params.orderId;
    ordersModel.updateOrderStatus(orderId, status, (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'Order status updated' });
    });
});

// Route to get orders by a user
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    ordersModel.getOrdersByUser(userId, (err, orders) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(orders);
    });
});

// Route to get order details
router.get('/details/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    ordersModel.getOrderDetails(orderId, (err, details) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(details);
    });
});

// Route to remove a product from an order
router.delete('/remove/:orderId/:productId', (req, res) => {
    const { orderId, productId } = req.params;
    ordersModel.removeProductFromOrder(orderId, productId, (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'Product removed from order' });
    });
});


// Route to delete an order
router.delete('/delete/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    ordersModel.deleteOrder(orderId, (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'Order deleted' });
    });
});






module.exports = router;
