/*
* @Author: Kafei59
* @Date:   2016-05-23 17:16:42
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-23 17:40:07
*/

const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './config/parameters.env'});

const assert = require('chai').assert;
const expect = require('chai').expect;

const User = require('../models/user');

before(function(done) {
    if (mongoose.connection.db) return;
    mongoose.connect(process.env.MONGODB_TEST_URL, function() {
        mongoose.connection.db.dropDatabase(function(){
            done();
        });
    });
});

describe('User', function() {
    describe('#save()', function () {
        it('should save without error', function(done) {
            var user = new User({
                'username': "Kafei",
                'email': "toto@mail.com",
                'password': "toto"
            });

            user.save(function(err, entity) {
                expect(entity.username).to.equal("Kafei");
                expect(entity.email).to.equal("toto@mail.com");
                expect(entity.password).to.not.equal("toto");
                done();
            });
        });

        it('should not save because of username', function(done) {
            var user = new User({
                'username': "Kafei",
                'email': "lala@mail.com",
                'password': "toto"
            });

            user.save(function(err) {
                expect(err).to.exist;
                done();
            });
        });

        it('should not save because of email', function(done) {
            var user = new User({
                'username': "Toto",
                'email': "toto@mail.com",
                'password': "toto"
            });

            user.save(function(err) {
                expect(err).to.exist;
                done();
            });
        });
    });
});
