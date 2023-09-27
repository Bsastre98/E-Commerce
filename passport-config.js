const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./models/user'); // make sure the path is correct

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your_jwt_secret'; // please use a more secure key and preferably store it in an environment variable

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id, function (err, user) {  // Implement a method to find user by ID
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);

module.exports = passport;