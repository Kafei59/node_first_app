/*
* @Author: Kafei59
* @Date:   2016-05-20 11:37:33
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 11:45:34
*/

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

module.exports = function(app) {
    mongoose.connect('mongodb://localhost/nodul');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection done');
    });

    app.set('port', (process.env.PORT || 5000));
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));

    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());

    app.listen(app.get('port'), function() {
        console.log('Our app is running on port: ' + app.get('port'));
    });
};
