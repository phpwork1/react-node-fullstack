const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require('./models/user');
require('./services/passport');
const app = express();

//activate cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//connect mongoose into MLab (MongoDB URI)
mongoose.connect(keys.mongoURI);

//use authRoutes with app
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);