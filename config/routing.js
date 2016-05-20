/*
* @Author: Kafei59
* @Date:   2016-05-20 11:25:27
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 11:51:06
*/

'use strict';

var HomeController = require('../controllers/home'); 

module.exports = function (app) {
    app.get('/', HomeController.index);
};
