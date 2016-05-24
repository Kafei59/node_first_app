/*
* @Author: Kafei59
* @Date:   2016-05-23 17:16:42
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-24 10:27:52
*/

const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './config/parameters.env'});

const assert = require('chai').assert;
const expect = require('chai').expect;

const User = require('../models/user');
const UserService = require('../services/user');

before(function(done) {
    if (mongoose.connection.db) {
        return;
    } else {
        mongoose.connect(process.env.MONGODB_TEST_URL, function() {
            mongoose.connection.db.dropDatabase(function() {
                done();
            });
        });
    }
});

describe('User', function() {
    describe('#save()', function () {
        it('should save without error', function(done) {
            UserService.create("Kafei", "toto@mail.com", "toto", function(err, user) {
                expect(err).to.be.null;
                expect(user.username).to.equal("Kafei");
                expect(user.email).to.equal("toto@mail.com");
                expect(user.password).to.not.equal("toto");
                done();
            });
        });

        it('should not save because of username', function(done) {
            UserService.create("Kafei", "lala@mail.com", "toto", function(err, user) {
                expect(err).to.not.be.null;
                done();
            });
        });

        it('should not save because of email', function(done) {
            UserService.create("Toto", "toto@mail.com", "toto", function(err, user) {
                expect(err).to.not.be.null;
                done();
            });
        });
    });
});
