/*
* @Author: Kafei59
* @Date:   2016-05-26 11:59:40
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 12:12:23
*/

const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './config/parameters.env'});

const assert = require('chai').assert;
const expect = require('chai').expect;

const User = require('../models/user');
const UserService = require('../services/user');

const Channel = require('../models/channel');
const ChannelService = require('../services/channel');

const user = new User({
    'username': "Totolafrite",
    'email': "frite@mail.com",
    'password': "toto"
});

describe('Channel', function() {
    describe('#save()', function () {
        it('should save without error', function(done) {
            ChannelService.create("Title", "Description", user, function(err, channel) {
                expect(err).to.be.null;
                expect(channel.title).to.equal("Title");
                expect(channel.description).to.equal("Description");
                expect(channel.owner).to.not.be.null;
                expect(channel.owner.username).to.equal("Totolafrite");
                expect(channel.id).to.be.oneOf(user.channels);
                done();
            });
        });

        it('should not save because of title', function(done) {
            UserService.create("Title", "Description", user, function(err, channel) {
                expect(err).to.be.null;
                done();
            });
        });
    });
});
