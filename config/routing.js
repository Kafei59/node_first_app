/*
* @Author: Kafei59
* @Date:   2016-05-20 11:25:27
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 11:50:11
*/

'use strict';

var HomeController = require('../controllers/home');
var UserController = require('../controllers/user');
var ChannelController = require('../controllers/channel');

module.exports = function (app) {
    app.get('/', HomeController.index);

    app.get('/login', UserController.getLogin);
    app.post('/login', UserController.postLogin);
    app.get('/signup', UserController.getSignUp);
    app.post('/signup', UserController.postSignUp);
    app.get('/logout', UserController.logout);

    app.get('/channel', ChannelController.getChannel);
    app.post('/channel', ChannelController.postChannel);
};
