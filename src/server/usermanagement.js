/**
 * @author kecso / https://github.com/kecso
 */

'use strict';

var express = require('express'),
    path = require('path'),
    ejs = require('ejs'),
    fs = require('fs'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    DIST_DIR = path.join(__dirname, '..', '..', 'dist'),
    DEFAULT_ORG = 'SEAML',
    gmeAuth,
    logger;

function atNewUser(auth, data) {
    auth.addUserToOrganization(data.userId, DEFAULT_ORG)
        .then(function () {
            logger.debug('Added', data.userId, 'to', DEFAULT_ORG);
        })
        .catch(function (err) {
            logger.error('Failed to add user', data.userId, 'to default organization', DEFAULT_ORG, err);
        });
}

function serveFile(fileName, res) {
    var options = {
        root: DIST_DIR,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    logger.debug('serving file', fileName);
    res.sendFile(fileName, options, function(err) {
        if (err) {
            logger.error('Failed to send ' + fileName, err);
            res.status(err.status).end();
        }
    });
}

function initialize(middlewareOpts) {
    var ensureAuthenticated = middlewareOpts.ensureAuthenticated;

    logger = middlewareOpts.logger.fork('UserManagementPage');
    logger.debug('initializing ...');

    router.use(bodyParser.json({}));
    router.use(bodyParser.urlencoded({extended: true}));
    router.use('*', function(req, res, next) {
        // res.setHeader('X-WebGME-Media-Type', 'webgme.v2');
        next();
    });

    // Detecting if its a file name
    router.get(/\./, function(req, res) {
        var onlyFileExtension = req.originalUrl.match(/[^\/]+$/)[0]; // this is the file name
        serveFile(onlyFileExtension, res);
    });

    router.get(['/login', '/register', '/requested'], function(req, res) {
        logger.debug('Login path taken:', req.originalUrl);

        fs.readFile(path.join(DIST_DIR, 'login.html'), 'utf8', function(err, indexTemplate) {
            if (err) {
                logger.error(err);
                res.send(404);
            } else {
                res.contentType('text/html');
                res.send(ejs.render(indexTemplate, {
                    baseUrl: req.baseUrl
                }));
            }
        });
    });

    var ROUTES = [
        '/',
        '/home',
        '/profile',
        '/projects', /\/projects\/\w+$/, /\/projects\/\w+\/\w+$/,
        '/organizations', /\/organizations\/\w+$/,
        '/users', /\/users\/\w+$/,
        '/newuser'
    ];

    router.get(ROUTES, ensureAuthenticated, function(req, res) {

        fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8', function(err, indexTemplate) {
            if (err) {
                logger.error(err);
                res.send(404);
            } else {
                res.contentType('text/html');
                res.send(ejs.render(indexTemplate, {
                    baseUrl: req.baseUrl
                }));
            }
        });
    });

    // Add newly created users to default organization
    gmeAuth = middlewareOpts.gmeAuth;
    gmeAuth.addEventListener(middlewareOpts.gmeAuth.USER_CREATED, atNewUser);

    logger.debug('ready');
}

module.exports = {
    initialize: initialize,
    router: router,
    start: function(callback) {
        gmeAuth.addOrganization(DEFAULT_ORG)
            .then(function () {
                logger.info('Created default organization', DEFAULT_ORG, 'at start up.');
                callback();
            })
            .catch(function (err) {
                if (err.message.indexOf('already exists') > -1) {
                    logger.info('Default organization', DEFAULT_ORG, 'existed at start up.');
                    callback();
                } else {
                    callback(err);
                }
            })
            .done();
    },
    stop: function(callback) {
        gmeAuth.removeEventListener(gmeAuth.USER_CREATED, atNewUser);
        callback(null);
    }
};
