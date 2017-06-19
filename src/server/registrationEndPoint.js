/*jshint node:true, camelcase:false*/
/**
 * This is the default registration end point. It either allows or disallows users to register.
 * It will be used if gmeConfig.authentication.allowUserRegistration is either false or true.
 * To plugin your deployment specific end-point set gmeConfig.authentication.allowUserRegistration to
 * a path to a module with the same signature as this.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

'use strict';
module.exports = function getRegistrationEndPoint(middlewareOpts) {
    var gmeConfig = middlewareOpts.gmeConfig,
        gmeAuth = middlewareOpts.gmeAuth;

    return function (req, res, next) {
        var receivedData = req.body;

        if (gmeConfig.authentication.enable === false) {
            res.sendStatus(404);
            return;
        }

        // TODO: Add regex for userId and check other data too.
        if (typeof receivedData.userId !== 'string' || receivedData.userId.length === 0 ||
            typeof receivedData.email !== 'string' || receivedData.email.length === 0) {
            res.sendStatus(400);
            return;
        }

        gmeAuth.listUsers()
            .then(function (currentUsers) {
                var i;

                for (i = 0; i < currentUsers.length; i += 1) {
                    if (currentUsers[i]._id === receivedData.userId) {
                        throw new Error('UserID [' + receivedData.userId + '] is already used!');
                    } else if (currentUsers[i].email === receivedData.email) {
                        throw new Error('Email [' + receivedData.email + '] is already used!');
                    }
                }

                res.sendStatus(200);
            })
            .catch(function (err) {
                if (err.message.indexOf('] is already used!') > -1) {
                    res.sendStatus(400);
                    return;
                }

                next(err);
            });
    };
};