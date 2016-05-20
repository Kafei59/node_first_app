/*
* @Author: Kafei59
* @Date:   2016-05-20 11:42:45
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 15:21:40
*/

var User = require('../models/user');

/**
 * GET /
 * Home page.
 */
module.exports.index = function(req, res) {
    var user = new User({
        'username': "Kafei",
        'email': "kafei@mail.com",
        'password': "toto"
    });

    res.render('index', {title: 'Home', user: user});
}
