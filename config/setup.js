/*
* @Author: Kafei59
* @Date:   2016-05-20 11:37:33
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 17:04:31
*/

const express = require('express');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('express-flash');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv').config({path: './config/parameters.env'});

module.exports = function(app) {
    mongoose.connect(process.env.MONGODB_URL);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection done');
    });

    app.set('port', (process.env.PORT));
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + process.env.PUBLIC_FOLDER));

    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());
    app.use(validator());

    app.use(session({
        secret: process.env.SECRET_KEY,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.listen(app.get('port'), function() {
        console.log('Our app is running on port: ' + app.get('port'));
    });
};

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (!user) {
            return done(null, false, { msg: `Username ${username} not found.` });
        }

        user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
                return done(null, user);
            }

            return done(null, false, { msg: 'Invalid username or password.' });
        });
    });
}));
