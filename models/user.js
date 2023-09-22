const db = require('../db.js');

// Function to create a new user
const createUser = (user, callback) => {
    const sql = "INSERT INTO User SET ?";
    db.query(sql, user, callback);
};

module.exports = {
    createUser




};