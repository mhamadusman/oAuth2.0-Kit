
import nodemailer from "nodemailer"

const email = process.env.SENDER_EMAIL
const password = process.env.SENDER_APP_PASSWORD

if (!email || !password) {
  throw new Error("Email credentials are missing")
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password
  }
})

const connectNodemailer = async (): Promise<void> => {
  try {
    await transporter.verify()
    console.log("Nodemailer connected successfully")
  } catch (error) {
    console.log("Error connecting Nodemailer:", error)
  }
}

export default connectNodemailer