// utils/emailSender.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true, // MailDev doesn't support TLS
});

export const sendWelcomeEmail = async (email, username) => {
  try {
    await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: 'Welcome to Our App!',
      text: `Hi ${username}, Welcome to our application!`,
      html: `
        <h1>Hi ${username},</h1>
        <p>Welcome to our application!</p>
        <p>This email was sent via MailDev for testing purposes.</p>
      `,
    });
    console.log('Welcome email sent to MailDev');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};