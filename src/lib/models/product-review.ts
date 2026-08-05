import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";

export interface IProductReview {
  customer: Types.ObjectId | IUser;
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
  },
  { timestamps: true }
);

export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
  