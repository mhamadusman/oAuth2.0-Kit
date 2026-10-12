
import { transporter } from "../config/config.nodemailer"
import { Iemail } from "../types/type.auth"

export class emailService {
  static async sendEmail(message: object): Promise<void> {
    console.log("email details :: ", message)

    try {
      const info = await transporter.sendMail(message)
      console.log("email sent successfully :: ", info.messageId)
    } catch (error) {
      console.log("error in sending email verification link", error)
      throw error
    }
  }

  static async sendEmailVerificationLink(
    details: Iemail,
    to: string
  ): Promise<void> {
    const message = {
      from: {
        name: "AppStore",
        address: process.env.SENDER_EMAIL!
      },
      to,
      subject: details.subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p>${details.message}</p>
          <p>
            <a href="${details.link}" style="background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </p>
        </div>
      `
    }

    await this.sendEmail(message)
  }
}