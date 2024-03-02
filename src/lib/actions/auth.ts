"use server";

import * as z from "zod";
import db from "../prisma";
import { userRegistrationSchema } from "../schema/schema";
import { hash } from "bcrypt";


// Get the Types using zod validation schema
type RegisterData = z.infer<typeof userRegistrationSchema>;


export async function registerUser(formdata: RegisterData) {
  try {

    // Check if Existing Email
    const existingEmail = await db.user.findUnique({
      where: {
        email: formdata.email,
      },
    });

    if (existingEmail) {
      return { duplicate: "Duplicate" };
    }

    // Hash the password!
    const hashPassword = await hash(formdata.password, 10)

    // Create the User
    await db.user.create({
      data: {
        firstname: formdata.firstName,
        lastname: formdata.lastName,
        email: formdata.email,
        password: hashPassword,
      },
    });
    return { success: "" };
  } catch (error) {
    console.log(error);
    return { error: "Error" };
  }
}
