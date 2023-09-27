const db = require('../db.js');
const bcrypt = require('bcrypt');


// Function to create a new user
const createUser = (user, callback) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return callback(err);
        }
        user.password = hash;
        const sql = "INSERT INTO User SET ?";
        db.query(sql, user, callback);
    });
};



// Function to find a user by email
const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM User WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length) {
            return callback(null, results[0]);  // return the first result
        }
        return callback(null, null);  // No matching user found
    });
};

//Fetch user details based on ID
const getUserById = (userId, callback) => {
    const sql = "SELECT * FROM User WHERE userID = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length) {
            return callback(null, results[0]); // return the first result
        }
        return callback(null, null);  // No matching user found
    });
};


//Update user details
const updateUserById = (userId, userData, callback) => {
    if (userData.password) {
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) {
                return callback(err);
            }
            userData.password = hash;
            const sql = "UPDATE User SET ? WHERE userID = ?";
            db.query(sql, [userData, userId], callback);
        });
    } else {
        const sql = "UPDATE User SET ? WHERE userID = ?";
        db.query(sql, [userData, userId], callback);
    }
};


//Delete user
const deleteUserById = (userId, callback) => {
    const sql = "DELETE FROM User WHERE userID = ?";
    db.query(sql, [userId], callback);
};













module.exports = {
    createUser,
    findUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById

};