"use server";

import dbConnect from "@/lib/mongodb";
import mongoose, { ObjectId } from "mongoose";
import User from "@/lib/models/user";
import { redirect } from "next/navigation";

export async function getUser(userId: ObjectId) {
  await dbConnect();
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found.");

  return user;
}

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
