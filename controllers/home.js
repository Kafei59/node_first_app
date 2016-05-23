/*
* @Author: Kafei59
* @Date:   2016-05-20 11:42:45
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 17:08:27
*/

var User = require('../models/user');

/**
 * GET /
 * Home page.
 */
module.exports.index = function(req, res) {
    res.render('index', {title: 'Home', user: req.user});
}
