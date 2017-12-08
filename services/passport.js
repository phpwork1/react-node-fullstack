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
        (accessToken, refreshToken, profile, done) => {
            //find user with googleId of profile.id
            User.findOne({googleId: profile.id})
                .then((existingUser) => {
                    if (existingUser) {
                        //We already have a record with the given profile Id
                        done(null, existingUser); //
                    } else {
                        //we don't have a record with the given profile Id
                        //create user who has a googleId of profile.id
                        new User({googleId: profile.id})
                            .save()
                            .then(user => done(null, user));
                    }
                });

        }
    )
);