/*
* @Author: Kafei59
* @Date:   2016-05-22 11:53:48
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 16:30:55
*/

const passport = require('passport');
const User = require('../models/user');

/**
 * GET /login
 * Login page.
 */
module.exports.getLogin = function(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('login', {title: 'Login'});
    }
}

/**
 * POST /login
 * Login authentication.
 */
module.exports.postLogin = function(req, res, next) {
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        res.redirect('/login');
    } else {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    req.flash('errors', info.msg);
                    res.redirect('/login');
                } else {
                    req.logIn(user, function(err) {
                        if (err) {
                            next(err);
                        } else {
                            req.flash('info', "Successful, you are log in");
                            res.redirect('/');
                        }
                    });
                }
            }
        })(req, res, next);
    }

}

/**
 * GET /signup
 * Signup page.
 */
module.exports.getSignUp = function(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('signup', {title: 'Signup'});
    }
}

/**
 * POST /signup
 * Signup form.
 */
module.exports.postSignUp = function(req, res, next) {
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('email', 'Username cannot be blank').notEmpty().isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        req.flash('errors', errors);
        res.redirect('/signup');
    } else {
        User.findOne({ email: req.body.email }, function(err, existingUser) {
            if (existingUser) {
                req.flash('errors', { msg: 'Account with that email address already exists.' });
                res.redirect('/signup');
            } else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });

                user.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        req.logIn(user, function(err) {
                            if (err) {
                              return next(err);
                            } else {
                                res.redirect('/');
                            }
                        });
                    }
                });
            }
        });
    }
}

/**
 * GET /logout
 * Logout page.
 */
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
