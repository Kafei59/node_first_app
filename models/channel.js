/*
* @Author: Kafei59
* @Date:   2016-05-25 12:23:11
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 12:00:32
*/

const mongoose = require('mongoose');
const UserService = require('../services/user');

const ChannelSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date}
});

ChannelSchema.pre('save', function(next) {
    this.date = new Date();
    next();
});

ChannelSchema.post('save', function() {
    UserService.addChannel(this.owner, this, function(err, user) {})
});

module.exports = mongoose.model('Channel', ChannelSchema);
