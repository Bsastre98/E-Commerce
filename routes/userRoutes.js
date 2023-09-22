const express = require('express');
const router = express.Router();
const User = require('../models/user');

// API endpoint to create a new user
router.post('/api/users', (req, res) => {
    User.createUser(req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while inserting the user.' });
        }
        res.json({ message: 'User successfully inserted.', insertId: results.insertId });
    });
});

module.exports = router;
