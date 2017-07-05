/*jshint node:true, camelcase:false*/
/**
 *
 * @author pmeijer / https://github.com/pmeijer
 */

'use strict';
module.exports = function getRegistrationEndPoint(middlewareOpts) {
    var gmeConfig = middlewareOpts.gmeConfig,
        gmeAuth = middlewareOpts.gmeAuth,
        logger = middlewareOpts.logger.fork('GSN-Registration');


    return function (req, res, next) {
        var receivedData = req.body,
            logData = JSON.stringify(JSON.stringify(receivedData));

        delete logData.password;

        if (gmeConfig.authentication.enable === false) {
            res.sendStatus(404);
            return;
        }

        logger.info('New user request!', logData);

        // TODO: Add regex for userId and check other data too.
        if (typeof receivedData.userId !== 'string' || receivedData.userId.length < 3 || /^[A-Za-z0-9_]+$/.test(receivedData.userId) === false ||
            typeof receivedData.email !== 'string' || receivedData.email.length === 0 ||
            typeof receivedData.info !== 'object' || receivedData.info === null ||
            typeof receivedData.info.userName !== 'string' || receivedData.info.userName.length === 0 ||
            typeof receivedData.info.orgName !== 'string' || receivedData.info.orgName.length === 0 ||
            typeof receivedData.info.orgAddr !== 'string' || receivedData.info.orgAddr.length === 0 ||
            typeof receivedData.info.orgCountry !== 'string' || receivedData.info.userName.orgCountry === 0) {

            logger.warn('Provided data was invalid!');
            res.sendStatus(400);
            return;
        }

        gmeAuth.listUsers({disabled: undefined, email: receivedData.email})
            .then(function (currentUsers) {
                if (currentUsers.length !== 0) {
                    throw new Error('Email [' + receivedData.email + '] is already registered!');
                }

                return gmeAuth.addUser(receivedData.userId, receivedData.email, receivedData.password, true, {
                    disabled: true,
                    data: {
                        userName: receivedData.info.userName,
                        orgName: receivedData.info.orgName,
                        orgAddr: receivedData.info.orgAddr,
                        orgCountry: receivedData.info.orgCountry
                    }
                });
            })
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                if (err.message.indexOf('] is already registered!') > -1 ||
                    err.message.indexOf('user already exists') > -1) {
                    logger.error(err);
                    res.sendStatus(400);
                    return;
                }

                next(err);
            });
    };
};