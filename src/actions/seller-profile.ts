"use server";

import dbConnect from "@/lib/mongodb";
import SellerProfile from "@/lib/models/seller-profile";
import { UserRole } from "@/lib/models/roles";
import { getSession } from "@/lib/session";

export async function createOrUpdateSellerProfile(
  _previousState: string | undefined,
  formData: FormData,
) {
  const session = await getSession();

  if (!session.userId) {
    return "Please log in to create your seller profile.";
  }

  if (session.userRole !== UserRole.Seller) {
    return "Only sellers can create a seller profile.";
  }

  const avatar = formData.get("avatar");

  if (avatar instanceof File && avatar.size > 2 * 1024 * 1024) {
    return "Please choose an image smaller than 2 MB.";
  }

  if (avatar instanceof File && avatar.size > 0 && !avatar.type.startsWith("image/")) {
    return "Please choose an image file.";
  }

  const profileData: {
    seller: typeof session.userId;
    name: string;
    bio: string;
    location: string;
    experienceYears: number;
    website: string;
    instagram: string;
    productList: string[];
    avatarUrl?: string;
  } = {
    seller: session.userId,
    name: String(formData.get("name") || "").trim(),
    bio: String(formData.get("bio") || "").trim(),
    location: String(formData.get("location") || "").trim(),
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

  if (avatar instanceof File && avatar.size > 0) {
    const imageData = Buffer.from(await avatar.arrayBuffer()).toString("base64");
    profileData.avatarUrl = `data:${avatar.type};base64,${imageData}`;
  }

  try {
    await dbConnect();
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
