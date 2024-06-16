const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//endpoint to create a new product
router.post('/api/createProduct', (req, res) => {
    Product.createProduct(req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while inserting the product.' });
        }
        res.json({ message: 'Product successfully inserted.', insertId: results.insertId });
    });
});

//Endpoint to get a list of all products
router.get('/api/products', (req, res) => {
    Product.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching products.' });
        }
        res.json(products);
    });
});


//endpoint to get product by id
router.get('/api/products/:id', (req, res) => {
    Product.getProductById(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the product.' });
        }
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(product);
    });
});

//update a product
router.put('/api/products/:id', (req, res) => {
    Product.updateProduct(req.params.id, req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the product.' });
        }
        res.json({ message: 'Product updated successfully.' });
    });
});

//delete product
router.delete('/api/products/:id', (req, res) => {
    Product.deleteProduct(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the product.' });
        }
        res.json({ message: 'Product deleted successfully.' });
    });
});

//search product by name
router.get('/api/products/search/:name', (req, res) => {
    Product.searchProductsByName(req.params.name, (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching products.' });
        }
        res.json(products);
    });
});





module.exports = router;