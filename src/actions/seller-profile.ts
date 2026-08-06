"use server";

import dbConnect from "@/lib/mongodb";
import SellerProfile from "@/lib/models/seller-profile";
import User from "@/lib/models/user";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";
import { put } from "@vercel/blob";
import type { ObjectId } from "mongoose";

export async function getAllSellerProfiles() {
  await dbConnect();

  return SellerProfile.find({})
    .populate({
      path: "seller",
      select: "name email role",
      model: User,
    })
    .sort({ createdAt: -1 })
    .lean();
}

export async function getSellerProfileBySellerId(sellerId: string | ObjectId) {
  await dbConnect();

  return SellerProfile.findOne({ seller: sellerId })
    .populate({
      path: "seller",
      select: "name email role",
      model: User,
    })
    .lean();
}

export async function createOrUpdateSellerProfile(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await getSession();

  if (!session.userId) {
    return "Please log in to create your seller profile.";
  }

  if (session.userRole !== UserRole.Seller) {
    return "Only sellers can create a seller profile.";
  }

  await dbConnect();

  const existingProfile = await SellerProfile.findOne({ seller: session.userId });
  const imageFile = formData.get("avatar");
  let avatarUrl = existingProfile?.avatarUrl;

  if (imageFile instanceof File && imageFile.size > 0) {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });

    avatarUrl = blob.url;
  }

  const profileData = {
    seller: session.userId,
    bio: String(formData.get("bio") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    avatarUrl,
    experienceYears: Number(formData.get("experienceYears") || 0),
    website: String(formData.get("website") || "").trim(),
    instagram: String(formData.get("instagram") || "").trim(),
  };

  try {
    await SellerProfile.findOneAndUpdate(
      { seller: session.userId },
      { $set: profileData },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch (error) {
    console.error("Failed to save seller profile", error);
    return "There was a problem saving your seller profile.";
  }

  return "Seller profile saved successfully.";
}
