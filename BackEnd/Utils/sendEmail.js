const nodemailer = require("nodemailer");

const sendEmail = async (to, message) => {
    // Check if email password is configured
    if (!process.env.SEND_EMAIL_PASS) {
        console.error("SEND_EMAIL_PASS environment variable is not set");
        throw new Error("Email service is not configured. Please contact the administrator.");
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
      // Log more details for debugging
      console.error("Full error:", err);
      throw new Error(`Failed to send email: ${err.message}`);
    }
};

module.exports = sendEmail;
