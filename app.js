var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.get('*', function(req, res, next) {
    //การประกาศใน ทุกๆ method get ประกาศตัวแปร user ให้ใช้ทั้งหมด 
    res.locals.user = req.user || null
    next();
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('*', function(req, res, next) {
    //การประกาศใน ทุกๆ method get ประกาศตัวแปร user ให้ใช้ทั้งหมด 
    res.locals.user = req.user || null
    next();
});

module.exports = app;