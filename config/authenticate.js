/*
* @Author: Kafei59
* @Date:   2016-05-24 10:21:29
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-24 10:22:09
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(app) {
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
};
