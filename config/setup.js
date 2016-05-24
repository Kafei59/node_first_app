/*
* @Author: Kafei59
* @Date:   2016-05-20 11:37:33
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-24 10:22:39
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

function setupMongoose(app) {
    mongoose.connect(process.env.MONGODB_URL);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection done');
    });
};

function setupExpress(app) {
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
};

module.exports = function(app) {
    setupMongoose(app);
    setupExpress(app);

    app.listen(app.get('port'), function() {
        console.log('Our app is running on port: ' + app.get('port'));
    });
};
