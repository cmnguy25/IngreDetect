const nodemailer = require("nodemailer");
require("dotenv").config();

//check if text is not alpha (contains only alphabets and spaces)
function isAlpha(text) {
  let res = /^[a-zA-Z\s]+$/.test(text);
  return res;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//check for malicious headers
function containsMaliciousHeaders(message) {
  const pattern =
    /(Content-Type:|Bcc:|Cc:|To:|MIME-Version:|Content-Transfer-Encoding:|X-Priority:|X-MSMail-Priority:|X-Mailer:|Return-Path:|Message-ID:|X-Originating-IP:|X-Sender:|X-Authentication-Warning:|X-Yahoo-Newman-Property:|X-Yahoo-Newman-Id:|X-YMail-OSG:|X-YMail-OSG-Original-Recipient:|X-Yahoo-Filtered-Bulk:|X-Yahoo-Group-Id:|X-Yahoo-Profile:|X-YMail-User-Id:|X-YMail-Trace:|X-Originating-Email:|X-Yahoo-SMTP:|X-Yahoo-Newman-Property:|X-Yahoo-Newman-Id:|X-YMail-OSG:|X-YMail-OSG-Original-Recipient:|X-Yahoo-Filtered-Bulk:|X-Yahoo-Group-Id:|X-Yahoo-Profile:|X-YMail-User-Id:|X-YMail-Trace:|X-Originating-Email:|X-Yahoo-SMTP:)/i;
  if (pattern.test(message)) {
    return true;
  }
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

module.exports = {
  transporter,
  isAlpha,
  containsMaliciousHeaders,
  isValidEmail,
};
