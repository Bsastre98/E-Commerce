const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');



// Middleware to parse JSON bodies
app.use(express.json());

app.use(userRoutes);



app.use(productRoutes);




// Start the server
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
}); 123