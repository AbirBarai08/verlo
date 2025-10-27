const nodemailer = require("nodemailer");

const sendEmail = async (to, message) => {
    // Extract OTP from message for logging
    const otpMatch = message.match(/\d{6}/);
    if (otpMatch) {
        console.log(`\n========== OTP for ${to} ==========`);
        console.log(`OTP: ${otpMatch[0]}`);
        console.log(`=====================================\n`);
    }

    // Check if email password is configured
    if (!process.env.SEND_EMAIL_PASS) {
        console.warn("SEND_EMAIL_PASS not configured - email sending disabled");
        return; // Don't throw error, just log and continue
    }

    // Configure transporter with better settings for cloud deployment
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'abirbarai08@gmail.com',
            pass: process.env.SEND_EMAIL_PASS,
        },
        secure: true, // use TLS
        port: 465,
        timeout: 5000, // 5 second timeout
        connectionTimeout: 5000,
        debug: false,
    });

    const mailOptions = {
        from: `"VERLO" <abirbarai08@gmail.com>`,
        to,
        subject: 'Message for you',
        text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Mail sent successfully to", to);
    } catch (err) {
      console.error("Mail error:", err.message);
      console.log("Email sending failed, but operation continues. OTP is logged above.");
      // Don't throw error - let the operation continue
      // The OTP has already been logged to console
    }
};

module.exports = sendEmail;
