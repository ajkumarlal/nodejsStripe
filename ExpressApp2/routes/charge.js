var express = require('express'),
    router = express.Router(),
    Customer = require('../models/customer.js'),
    Reservation = require('../models/reservation.js'),
    config = require('../_config.js'),
    stripe = require('stripe')('sk_test_51aTG9iUrOMeaaxshvv6hgVe');
    //passport = require('passport');


router.get('/reservations', function (req, res) {
    return Reservation.find({}, function (err, data) {
        if (err) {
            return next(err);
        } else {
            return res.render('Reservations', { reservations: data, user: req.user });
        }
    });
});


router.get('/charge/:id', function (req, res, next) {
    var reservationID = req.params.id;
    return Reservation.findById(reservationID, function (err, data) {
        if (err) {
            if (err) { return next(err); }
        } else {
            return res.render('charge', { reservation: data });
        }
    });
});


router.get('/stripe', function (req, res, next) {
    res.send("Scram!");
});


router.post('/stripe', function (req, res, next) {
        
    // Obtain StripeToken
    var stripeToken = req.body.stripeToken;
    var email = req.body.email;
    var amount = req.body.productAmount;
    
    var data = new Customer(
        {
            email: email,
            amount: amount
        }
    
    );
    
   // var res = new reservations({ reservationID: req.body.productID, token: stripeToken });
    
    data.reservations.push({ reservationID: req.body.productID, token: stripeToken });

    data.save();
    
    
    //User.f(userID, function (err, data) {
    //    if (err) { return next(err); }
    //    data.products.push({ productID: req.body.productID, token: stripeToken });
    //    data.save();
    //});
    
    // Create Charge
    var charge =
 {
        amount: parseInt(req.body.productAmount) * 100,
        currency: 'USD',
        card: stripeToken
    };
    stripe.charges.create(charge,
    function (err, charge) {
        if (err) {
            if (err) { return next(err); }
        } else {
            console.log('Successful charge sent to Stripe!');
            req.flash('success', 'Thanks for purchasing a Ride' + '!');
            res.redirect('/');
        }
    }
    );

});

// router.get('/congrats', ensureAuthenticated, function(req, res, next) {
//   res.render('congrats', { user: req.user });
// });

//function ensureAuthenticated(req, res, next) {
//    if (req.isAuthenticated()) { return next(); }
//    req.flash('success', 'You must be signed in to view this page!');
//    res.redirect('/auth/login');
//}


module.exports = router;