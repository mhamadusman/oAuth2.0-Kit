import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
});
export const configureEmailService = async () => {
  try {
    await transporter.verify();
    console.log("Email service configured");
  } catch (error) {
    console.error("error in configuring email service", error);
  }
};
export default transporter;
