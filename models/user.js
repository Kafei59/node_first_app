/*
* @Author: Kafei59
* @Date:   2016-05-20 15:04:41
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-20 15:07:55
*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: String,
});

module.exports = mongoose.model('User', UserSchema);
