import transporter from "../config/config.nodemailer";
export class emailService {
  static async sendEmail(message: {}): Promise<void> {
    try {
      const info =  transporter.sendMail(message);
      //console.log("email sent successfully :: ", info.messageId);
    } catch (error) {
      console.log("error in seding email verification link", error);
    }
  }
  static async sendEmailVerificationLink(link: string, to: string): Promise<void> {
    const message = {
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: "Verify email account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verify Your Email</h2>
          <p>Please click the link below to verify your account:</p>
          <p><a href="${link}" style="background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a></p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${link}</p>
        </div>r
      `,
    };
     this.sendEmail(message);
  }
}
