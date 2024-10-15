import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 0,
  service: process.env.MAIL_SERVICE,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as SMTPTransport.Options);

export const sendOTP = (email: string, otp: string): void => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2E86C1;">Hello!</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <p style="font-size: 1.5em; font-weight: bold; color: #E74C3C;">${otp}</p>
        <p>Please use this code to complete your verification process. The OTP is valid for the next 10 minutes.</p>
        <p>If you did not request this code, please ignore this email or contact support.</p>
        <p>Best regards,<br>Code With Toyin Team</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};
