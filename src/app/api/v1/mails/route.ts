import db from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  console.log("Starting email sending process...");

  console.log("Reading SMTP credentials from environment variables...");
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;


  console.log("email: ", SMTP_EMAIL, " password: ", SMTP_PASSWORD)
  console.log("Creating nodemailer transport...");


  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  console.log("Sending email...");
  try {
    const body = await request.json();
    const { to, subject, content } = body;
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: content,
    });
    console.log("Email sent successfully:", sendResult);
    return NextResponse.json({result: sendResult})
  } catch (error) {
    console.error("Error sending email:", error);  
  }
}
