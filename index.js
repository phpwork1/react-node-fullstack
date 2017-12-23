const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/key');
require('./models/user');
require('./services/passport');
const app = express();

//body parser make payload available in req.body within express post request
app.use(bodyParser.json());
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

//use routes with app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    //Express will serve production assets
    //main.js or main.css files
    app.use(express.static('client/build')); //search dir client/build for static files

    //Express will serve index.html
    //if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);