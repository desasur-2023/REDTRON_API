import { StatusCodes } from "http-status-codes";
import { BaseError } from "../errors/error";
import { transporter } from "../../config/nodemailer";
import dotenv from "dotenv";
dotenv.config();



const mailOptions = {
    from: 'sender@example.com',
    to: 'recipient@example.com',
    bcc: 'sender@example.com',
    subject: 'Hello from Node Mailer',
    text: 'This is the plain text version of the email.',
    html: '<p>This is the HTML version of the email.</p>'
  };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('Email sent:', info.response);
  //   }
  // });

export async function sendEmail(from, subject, html, user, password){
    mailOptions.from = '"REDTRON-APP" ' + from,
    mailOptions.to = user.email;
    mailOptions.bcc = from;
    mailOptions.subject = subject;
    mailOptions.html = await html.replace("NNAAMMEE", user.username) //funcion para reemplazar valores en html
                            .replace("PPHHOONNEE", user.phone)
                            .replace("EEMMAAIILL", user.email)
                            .replace("PPAASSWWOORRDD", password);

    const result = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          throw error;
        } else {
          return info;
        }
      })
}