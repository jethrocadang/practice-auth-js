"use server";

import { getVerificationTokenByEmail } from "@/data/verficationToken";
import { randomInt } from "crypto";
import db from "./prisma";

export async function generateVerficationToken(email: string) {
  // Generate 6-digit OTP  
  const token = OTP();

  // Create Expiration for OTP
  const expires = new Date(new Date().getTime() + 3000 * 1000);

  // Check if there is existing token
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Store the Token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken
}

// Create the OTP
function OTP(): string {
  const min = 100000; // Minimum value for a 6-digit number
  const max = 999999; // Maximum value for a 6-digit number
  return String(randomInt(min, max));
}
