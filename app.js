

/*
* @Author: Kafei59
* @Date:   2016-05-20 11:25:27
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 11:41:52
*/

const express = require('express');

const setup = require('./config/setup');
const routing = require('./config/routing');

var app = express();
setup(app);
routing(app);
