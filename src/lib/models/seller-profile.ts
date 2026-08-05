<<<<<<< HEAD
import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";
=======
import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "@/lib/models/user";
import { getUser } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71

export interface ISellerProfile {
  _id: ObjectId;
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
      required: true,
    },
<<<<<<< HEAD

    name: String,
=======
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71
    bio: String,
    location: String,
    avatarUrl: String,
    experienceYears: Number,
    website: String,
    instagram: String,
  },
  { timestamps: true }
);

export default mongoose.models.SellerProfile ||
  mongoose.model("SellerProfile", SellerProfileSchema);
  