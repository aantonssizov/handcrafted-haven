import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "@/lib/models/user";
import { getUser } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";

export interface ISellerProfile {
  seller: Types.ObjectId | IUser;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  experienceYears?: number;
  website?: string;
  instagram?: string;
}

const SellerProfileSchema = new mongoose.Schema<ISellerProfile>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: async (v: ObjectId) => {
        const user = await getUser(v);

        return user.role === UserRole.Seller;
      },
    },
    bio: String,
    location: String,
    avatarUrl: String,
    experienceYears: Number,
    website: String,
    instagram: String,
  },
  { timestamps: true },
);

export default mongoose.models.SellerProfile ||
  mongoose.model("SellerProfile", SellerProfileSchema);
