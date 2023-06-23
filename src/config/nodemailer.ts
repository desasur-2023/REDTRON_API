const nodemailer = require("nodemailer");
import dotenv from "dotenv";
dotenv.config();


export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Set to true if using a secure connection like SSL/TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify().then(() => {
  console.log("Ready to send emails");
});