const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, message) => {
  try {
    const data = await resend.emails.send({
      from: 'VERLO <onboarding@resend.dev>',
      to: to,
      subject: 'Your VERLO OTP',
      html: message,
    });
    console.log("Email sent successfully to", to);
    return data;
  } catch (err) {
    console.error("Resend email error:", err);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

module.exports = sendEmail;
