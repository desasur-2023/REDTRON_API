const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if using a secure connection like SSL/TLS
    auth: {
      user: 'your_username',
      pass: 'your_password'
    }
  });
  