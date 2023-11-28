const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendMailHtml = (to, subject, html) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail,
    sendMailHtml
} 