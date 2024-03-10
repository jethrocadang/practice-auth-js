import nodemailer from "nodemailer";

export async function sendMail({
    to,
    name,
    subject,
    body,
  }: {
    to: string;
    name: string;
    subject: string;
    body: string;
  }) {
    console.log("Starting email sending process...");

    console.log("Reading SMTP credentials from environment variables...");
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
    console.log("email: ", SMTP_EMAIL, " password: ", SMTP_PASSWORD)

  
    console.log("Creating nodemailer transport...");
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    console.log("Verifying transport connection...");
    try {
      const testResult = await transport.verify();
      console.log("Transport connection verified successfully:", testResult);
    } catch (error) {
      console.error("Error verifying transport connection:", error);
      return;
    }
  
    console.log("Sending email...");
    try {
      const sendResult = await transport.sendMail({
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log("Email sent successfully:", sendResult);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  

// import nodemailer from 'nodemailer';


// export async function sendMail({email}:{email: string}){

//     const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
// // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465, // Gmail SMTP port
//   secure: true, // Use SSL/TLS
//   auth: {
//     user: SMTP_EMAIL, // Your Gmail address
//     pass: SMTP_PASSWORD, // Your Gmail password or app password
//   },
// });

// // Define email content
// const mailOptions = {
//   from: SMTP_EMAIL,
//   to: email,
//   subject: 'Test Email',
//   text: 'This is a test email sent using Nodemailer.',
// };

// console.log("It is here?")
// // Send email
//  await transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });

// console.log("How about here?")


// }

