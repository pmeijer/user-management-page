/*globals*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */


'use strict';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    sendmail: true
});


var mailOptions = {
    from: '"Foo Bar" <foo@bar.com>', // sender address
    to: 'humtpydumpty@mail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world' // plain text body
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
});