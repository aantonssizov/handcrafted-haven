import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";

export interface ISellerProfile {
  seller: Types.ObjectId | IUser;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  experienceYears?: number;
  website?: string;
  instagram?: string;
  productList?: string[];
}

const SellerProfileSchema = new mongoose.Schema<ISellerProfile>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    bio: String,
    location: String,
    avatarUrl: String,
    experienceYears: Number,
    website: String,
    instagram: String,
    productList: [String],
  },
  { timestamps: true }
);

export default mongoose.models.SellerProfile ||
  mongoose.model("SellerProfile", SellerProfileSchema);
  