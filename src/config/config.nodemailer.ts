import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  service: "gmail",
  family: 4,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
} as SMTPTransport.Options);

export const configureEmailService = async () => {
  try {
    await transporter.verify();
    console.log("Email service configured");
  } catch (error) {
    console.error("error in configuring email service", error);
  }
};
export default transporter;
