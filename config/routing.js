/*
* @Author: Kafei59
* @Date:   2016-05-20 11:25:27
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 15:49:41
*/

'use strict';

var HomeController = require('../controllers/home');
var UserController = require('../controllers/user');

module.exports = function (app) {
    app.get('/', HomeController.index);

    app.get('/login', UserController.getLogin);
    app.post('/login', UserController.postLogin);
    app.get('/signup', UserController.getSignUp);
    app.post('/signup', UserController.postSignUp);

    app.get('/logout', UserController.logout);
};
