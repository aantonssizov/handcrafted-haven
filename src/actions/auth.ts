"use server";

import User from "@/lib/models/user";
import dbConnect from "@/lib/mongodb";
import { createSession, deleteSession } from "@/lib/session";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function signup(state: string | undefined, formData: FormData) {
  await dbConnect();
  const user = new User({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  try {
    await user.save();
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) return err.message;
    return "An error occured while creating a new user.";
  }

  await createSession(user._id, user.role);

  redirect("/dashboard");
}

export async function login(state: string | undefined, formData: FormData) {
  await dbConnect();
  const user = await User.findOne({ email: formData.get("email") });

  if (!user) {
    return "User not found";
  }

  if (!(await user.comparePassword(formData.get("password")))) {
    return "Password is incorrect";
  }

  await createSession(user._id, user.role);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
