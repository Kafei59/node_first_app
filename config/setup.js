/*
* @Author: Kafei59
* @Date:   2016-05-20 11:37:33
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-22 12:21:42
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

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
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

module.exports = function(app) {
    mongoose.connect('mongodb://kafei:d41d8cd98f00b204e9800998ecf8427e@ds011422.mlab.com:11422/nodul');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection done');
    });

    app.set('port', (process.env.PORT || 5000));
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));

    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'YOUR_SECRET_KEY',
        store: new MongoStore({
            url: 'mongodb://kafei:d41d8cd98f00b204e9800998ecf8427e@ds011422.mlab.com:11422/nodul',
            autoReconnect: true
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.use(validator());

    app.listen(app.get('port'), function() {
        console.log('Our app is running on port: ' + app.get('port'));
    });
};
