"use strict";

require('dotenv').config();

var nodemailer = require('nodemailer');

function nodeMailer(email, code) {
  var transporter, info;
  return regeneratorRuntime.async(function nodeMailer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: process.env.E_USERNAME,
              // generated ethereal user
              pass: process.env.E_PASSWORD // generated ethereal password

            }
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: process.env.E_USERNAME,
            // sender address
            to: email,
            // list of receivers
            subject: "SellCenter",
            // Subject line
            text: "Hello" + email,
            // plain text body
            html: "<b>SellCenter- Your verification code: ".concat(code, "</b>") // html body

          }));

        case 3:
          info = _context.sent;
          console.log("Message sent: %s", info.messageId);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = nodeMailer;