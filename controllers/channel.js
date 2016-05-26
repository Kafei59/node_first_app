/*
* @Author: Kafei59
* @Date:   2016-05-26 11:42:55
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-05-26 11:58:12
*/

const passport = require('passport');
const Channel = require('../models/channel');
const ChannelService = require('../services/channel');

/**
 * GET /channel
 * Channel page.
 */
module.exports.getChannel = function(req, res) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        res.render('channel', {title: 'Channel'});
    }
}

/**
 * POST /channel
 * Channel form.
 */
module.exports.postChannel = function(req, res, next) {
    req.assert('title', 'Username cannot be blank').notEmpty();
    req.assert('description', 'Username cannot be blank').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        req.flash('errors', errors);
        res.redirect('/channel');
    } else {
        Channel.findOne({ title: req.body.title }, function(err, existingChannel) {
            if (existingChannel) {
                req.flash('errors', { msg: 'Channel title already exists.' });
                res.redirect('/channel');
            } else {
                ChannelService.create(req.body.title, req.body.description, req.user, function(err, channel) {
                    if (err) {
                        next(err);
                    } else {
                        req.user.channels.push(channel);
                        res.redirect('/');
                    }
                });
            }
        });
    }
}
