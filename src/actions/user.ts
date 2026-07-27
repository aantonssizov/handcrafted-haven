import dbConnect from "@/lib/mongodb";
import { ObjectId } from "mongoose";
import User from "@/lib/models/user";

export async function getUser(userId: ObjectId) {
  await dbConnect();
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found.");

  return user;
}
