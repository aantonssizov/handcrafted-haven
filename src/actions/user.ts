<<<<<<< HEAD
import dbConnect from "@/lib/mongodb";
import { ObjectId } from "mongoose";
import User from "@/lib/models/user";
=======
"use server";

import dbConnect from "@/lib/mongodb";
import mongoose, { ObjectId } from "mongoose";
import User from "@/lib/models/user";
import { redirect } from "next/navigation";
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71

export async function getUser(userId: ObjectId) {
  await dbConnect();
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found.");

  return user;
}
<<<<<<< HEAD
=======

export async function edit(
  userId: string,
  state: string | undefined,
  formData: FormData,
) {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(
      userId,
      {
        name: formData.get("name"),
        email: formData.get("email"),
      },
      { returnDocument: "after" },
    );
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) return err.message;
    return "An error occured while creating a new user.";
  }

  redirect("/dashboard");
}
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71
