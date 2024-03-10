"use server";

import * as z from "zod";
import db from "../lib/prisma";
import { RegisterSchema } from "../schemas/schema";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import { getUserByEmail } from "@/data/users";
import { generateVerficationToken } from "@/lib/tokens";
import { getVerificationTokenByEmail } from "@/data/verficationToken";
import { sendTokenbyEmail } from "@/lib/mail";

export async function registerUser(values: z.infer<typeof RegisterSchema>) {
  try {
    // Validate your data
    const validatedFields = RegisterSchema.safeParse(values);

    // If success you will get the .data
    if (!validatedFields.success) {
      return { error: "Invalid" };
    }

    // Destructure validatedFields
    const { firstName, lastName, email, password } = validatedFields.data;

    // Hash the password using bcrypt
    const hashPwd = await hash(password, 10);

    // Check Email if not Taken
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already registered!" };
    }

    // Create your user
    const createUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPwd,
      },
    });

    const verificationToken = await generateVerficationToken(email);
    
    if (verificationToken.token) {
      const sendTokenResult = await sendTokenbyEmail(
        verificationToken.token,
        email
      );

      // Check if email was sent successfully
      if (sendTokenResult.success) {
        // Email sent successfully
        return { success: "User registered and verification email sent" };
      } else {
        // Error sending email
        return { error: "Error sending verification email" };
      }
    } else {
      // Error generating verification token
      return { error: "Error generating verification token" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Error" };
  }
}
