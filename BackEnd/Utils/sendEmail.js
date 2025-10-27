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

    try {
      await transporter.sendMail(mailOptions);
      console.log("Mail sent");
    } catch (err) {
      console.error("Mail error:", err.message);
      return res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }

res.status(200).json({ message: "OTP sent successfully" });

};

module.exports = sendEmail;
