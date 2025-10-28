const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, message) => {
  try {
    await resend.emails.send({
      from: 'VERLO <onboarding@resend.dev>',
      to: to,
      subject: 'Your VERLO OTP',
      html: message,
    });
    console.log("OTP email sent to", to);
  } catch (err) {
    console.error("Resend email error:", err);
  }
};

module.exports = sendEmail;
