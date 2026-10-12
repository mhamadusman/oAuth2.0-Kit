
import { brevoClient } from "../config/config.brevo"
import { Iemail } from "../types/type.auth"

export class emailService {
  static async sendEmail(message: object): Promise<void> {
    try {
      const info = await brevoClient.transactionalEmails.sendTransacEmail(message)
      console.log("email sent successfully :: ", info)
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
      sender: {
        email: process.env.SENDER_EMAIL!,
        name: "AppStore"
      },
      to: [{ email: to }],
      subject: details.subject,
      htmlContent: `
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