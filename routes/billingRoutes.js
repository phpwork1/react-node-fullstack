const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "$5 for 5 credits"
        });

        //add credit to current user in session
        req.user.credits += 5;

        //save new updated user
        const user = await req.user.save();

        //send back updated user to frontend
        res.send(user);
    });
};
