const User = require('./models/user');  // make sure the path is correct

const emailToTest = "john@example.com";  // replace with an email that exists in your User table

User.findUserByEmail(emailToTest, (err, user) => {
    if (err) {
        console.error("An error occurred:", err);
        return;
    }

    if (user) {
        console.log("User found:", user);
    } else {
        console.log("No user found with that email.");
    }
});