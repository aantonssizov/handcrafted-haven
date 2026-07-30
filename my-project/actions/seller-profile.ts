"use server";

import dbConnect from "@/lib/mongodb";
import SellerProfile from "@/lib/models/seller-profile";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";

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

  const profileData = {
    seller: session.userId,
    name: String(formData.get("name") || "").trim(),
    bio: String(formData.get("bio") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    avatarUrl: String(formData.get("avatarUrl") || "").trim(),
    experienceYears: Number(formData.get("experienceYears") || 0),
    website: String(formData.get("website") || "").trim(),
    instagram: String(formData.get("instagram") || "").trim(),
    productList: String(formData.get("productList") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (!profileData.name) {
    return "Please enter a seller name.";
  }

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
