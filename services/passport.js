const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const key = require('../config/key');

//get mongoose model declared in models/user.js
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //Find user with id
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new googleStrategy({
            clientID: key.googleClientID,
            clientSecret: key.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            //find user with googleId of profile.id
            const existingUser = await User.findOne({googleId: profile.id});
            if (existingUser) {
                //We already have a record with the given profile Id
                return done(null, existingUser); //
            }
            //we don't have a record with the given profile Id
            //create user who has a googleId of profile.id
            const user = await new User({googleId: profile.id}).save();
            done(null, user);

        }
    )
);