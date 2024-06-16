const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const paymentDetailRoutes = require('./routes/paymentDetailRoutes');


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from 'Front end' directory
app.use(express.static('Front end'));

// Route to serve your add-product.html
app.get('/add-product', (req, res) => {
    res.sendFile(__dirname + '/Front end/add-product.html');
});





app.use(userRoutes);
app.use(productRoutes);
app.use(cartsRoutes);
app.use(ordersRoutes);
app.use(paymentRoutes);
app.use(paymentDetailRoutes);

// Start the server
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
}); 