"use server";

import User from "@/lib/models/user";
import dbConnect from "@/lib/mongodb";
import { createSession, deleteSession } from "@/lib/session";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function signup(state: string | undefined, formData: FormData) {
  await dbConnect();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return "An account with this email already exists.";
  }

  const user = new User({
    name: formData.get("name"),
    email,
    role: formData.get("role"),
    password: formData.get("password"),
  });

  try {
    await user.save();
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) return err.message;
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      return "An account with this email already exists.";
    }
    return "An error occured while creating a new user.";
  }

  await createSession(user._id, user.role);

  redirect("/dashboard");
}

export async function login(state: string | undefined, formData: FormData) {
  await dbConnect();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const user = await User.findOne({ email });

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
