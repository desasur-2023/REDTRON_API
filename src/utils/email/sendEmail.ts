import { StatusCodes } from "http-status-codes";
import { BaseError } from "../errors/error";

const mailOptions = {
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Hello from Node Mailer',
    text: 'This is the plain text version of the email.',
    html: '<p>This is the HTML version of the email.</p>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

export async function sendEmail(from, to, subject, html, variables){
    mailOptions.from = from,
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = html;
    //funcion para reemplazar valores en html

    const result = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          throw error;
        } else {
          console.log('Email sent:', info);
          return info;
        }
      })
}