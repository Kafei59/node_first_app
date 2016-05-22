/*
* @Author: Kafei59
* @Date:   2016-05-22 11:53:48
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-22 12:40:50
*/

const passport = require('passport');

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
                next(err);
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
 * GET /logout
 * Logout page.
 */
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
