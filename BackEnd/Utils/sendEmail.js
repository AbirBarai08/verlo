const nodemailer = require("nodemailer");

const sendEmail = async (to, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abirbarai08@gmail.com',
            pass: process.env.SEND_EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"VERLO" <abirbarai08@gmail.com>`,
        to,
        subject: 'Message for you',
        text: message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;