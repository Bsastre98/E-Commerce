const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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



// Login Route
router.post('/api/login', (req, res) => {
    // logic to validate user
    User.findUserByEmail(req.body.email, (err, user) => {

        if (err) {
            return res.status(500).json({ error: 'An error occurred while finding the user.' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Incorrect email or password.' });
        }

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while comparing passwords.' });
            }

            if (isMatch) {
                const payload = { id: user.userID, email: user.email };
                const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ message: 'User authenticated', token: token });
            } else {
                res.status(401).json({ error: 'Incorrect email or password.' });
            }
        });
    });
});

// Fetch a user's details by ID
router.get('/api/users/:id', (req, res) => {
    User.getUserById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching user details.' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    });
});


// Update a user's details by ID
router.put('/api/users/:id', (req, res) => {
    User.updateUserById(req.params.id, req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating user details.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ message: 'User updated successfully.' });
    });
});


// Delete a user by ID
router.delete('/api/users/:id', (req, res) => {
    User.deleteUserById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while deleting the user.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    });
});












module.exports = router;
