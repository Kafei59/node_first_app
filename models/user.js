/*
* @Author: Kafei59
* @Date:   2016-05-20 15:04:41
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 16:58:38
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    date: Date
});

UserSchema.pre('save', function(next) {
    user = this;

    user.date = new Date();
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
