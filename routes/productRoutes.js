const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//API endpoint to create a new product
router.post('/api/products', (req, res) => {
    Product.createProduct(req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while inserting the product.' });
        }
        res.json({ message: 'Product successfully inserted.', insertId: results.insertId });
    });
});





module.exports = router;