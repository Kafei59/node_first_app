/*
* @Author: Kafei59
* @Date:   2016-05-26 11:25:24
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 11:52:59
*/

const Channel = require('../models/channel');

module.exports.create = function(title, description, user, cb) {
    const channel = new Channel({
        title: title,
        description: description,
        owner: user
    });

    channel.save(function(err) {
        cb(err, channel);
    });
};

module.exports.edit = function(channel) {

};

module.exports.delete = function(channel, cb) {
    channel.remove(function(err) {
        cb(err);
    });
};
