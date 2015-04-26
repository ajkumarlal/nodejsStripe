var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mainRoutes = require('./routes/index');
var users = require('./routes/users');
var chargeRoutes = require('./routes/charge');
var apiRoutes = require('./routes/api');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var swig = require('swig');


var app = express();

process.env.NODE_ENV = 'development';
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// *** static directory *** ///
app.set('views', path.join(__dirname, './views'));

// *** config file *** //
var config = require('./_config');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// *** seed the database *** //
if (process.env.NODE_ENV === 'development') {
 // var seedReservation = require('./Models/seed/seedReservation.js');
//seedReservation();
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


app.use('/', mainRoutes);
app.use('/', chargeRoutes);
app.use('/api/v1', apiRoutes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
