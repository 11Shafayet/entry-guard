const nodemailer = require('nodemailer');
import { SentMessageInfo } from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (email: string, subject: string, content: string) => {
  try {
    let mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: content,
    };

    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          console.log(error);
        }
        console.log('Mail sent ', info.messageId);
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log('An unknown error occurred!');
  }
};

module.exports = { sendMail };
