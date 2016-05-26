/*
* @Author: Kafei59
* @Date:   2016-05-20 11:42:45
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 11:51:22
*/

var User = require('../models/user');
var Channel = require('../models/channel');

var ChannelService = require('../services/channel');
/**
 * GET /
 * Home page.
 */
module.exports.index = function(req, res) {
    if (req.user) {
        res.render('index', {title: 'Home', user: req.user});
    } else {
        res.render('index', {title: 'Home', user: req.user});
    }
}
