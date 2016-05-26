/*
* @Author: Kafei59
* @Date:   2016-05-24 10:13:49
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 11:53:26
*/

const User = require('../models/user');

module.exports.create = function(username, email, password, cb) {
    const user = new User({
        username: username,
        email: email,
        password: password
    });

    user.save(function(err) {
        cb(err, user);
    });
};

module.exports.edit = function(user) {

};

module.exports.delete = function(user, cb) {
    user.remove(function(err) {
        cb(err);
    });
};

module.exports.addChannel = function(user, channel, cb) {
    user.channels.push(channel);
    user.save(function(err) {
        cb(err, user);
    });
};
