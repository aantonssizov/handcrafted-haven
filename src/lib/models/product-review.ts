<<<<<<< HEAD
import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";
=======
import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "@/lib/models/user";
import { getUser } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";
import { IProduct } from "@/lib/models/product";
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71

export interface IProductReview {
  _id: ObjectId;
  customer: Types.ObjectId | IUser;
  product: Types.ObjectId | IProduct;
  rating: number;
  review?: string;
}

export const ProductReviewSchema = new mongoose.Schema<IProductReview>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      default: "",
    },
<<<<<<< HEAD
=======
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: { type: Number, min: 0, max: 5, required: true },
    review: String,
>>>>>>> 50f70239b2e4738e2f81a387473cc559ebd7af71
  },
  { timestamps: true }
);

export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
  