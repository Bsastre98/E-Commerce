const express = require('express');
const router = express.Router();
const Cart = require('../models/carts');

// Create a new cart for a user
router.post('/api/cart', (req, res) => {
    Cart.createCart(req.body.userID, (err, results) => {
        if (err) {
            // First check for the custom error message
            if (err.message === 'A user can only have one cart.') {
                return res.status(400).json({ error: err.message });  // Return 400 status for this specific error
            }
            // If it's not the specific error, then send the general error message
            return res.status(500).json({ error: 'An error occurred while creating the cart.' });
        }
        res.json({ message: 'Cart created successfully.' });
    });
});

// Add or update product in cart
router.post('/api/cart/item', (req, res) => {
    Cart.addOrUpdateProduct(req.body.cartID, req.body.productID, req.body.quantity, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the cart.' });
        }
        res.json({ message: 'Cart updated successfully.' });
    });
});

// Get all items in cart for a specific user
router.get('/api/cart/items/:cartID', (req, res) => {
    Cart.getItemsByCartID(req.params.cartID, (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the cart items.' });
        }
        res.json(items);
    });
});

// Remove a specific product from a cart
router.delete('/api/cart/:cartID/:productID', (req, res) => {
    Cart.removeProduct(req.params.cartID, req.params.productID, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while removing the product from the cart.' });
        }
        res.json({ message: 'Product removed from cart.' });
    });
});

// Clear all items from a cart
router.delete('/api/cart/:cartID', (req, res) => {
    Cart.clearCart(req.params.cartID, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while clearing the cart.' });
        }
        res.json({ message: 'Cart cleared.' });
    });
});

module.exports = router;