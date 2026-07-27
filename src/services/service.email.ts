import transporter from "../config/config.nodemailer";
import { Iemail } from "../types/type.auth";
export class emailService {
  static async sendEmail(message: {}): Promise<void> {
    try {
      const info = transporter.sendMail(message);
      //console.log("email sent successfully :: ", info.messageId);
    } catch (error) {
      console.log("error in seding email verification link", error);
    }
  }
  static async sendEmailVerificationLink(
    details: Iemail,
    to: string,
  ): Promise<void> {
    const message = {
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: details.subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p>${details.message}</p>
          <p><a href="${details.link}" style="background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a></p>
        </div>
      `,
    };
    this.sendEmail(message);
  }
}
