const sendEmail = async (to, message) => {
  console.log("SMTP PASS:", process.env.SEND_EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abirbarai08@gmail.com',
      pass: process.env.SEND_EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // optional for testing
    }
  });

  const mailOptions = {
    from: `"VERLO" <abirbarai08@gmail.com>`,
    to,
    subject: 'Your VERLO OTP',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully to", to);
  } catch (err) {
    console.error("Mail error:", err.message);
  }
};

module.exports = sendEmail;