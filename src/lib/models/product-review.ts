import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "@/lib/models/user";
import { getUser } from "../../../backend/src/actions/user";
import { UserRole } from "@/lib/models/roles";

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
      validate: async (v: ObjectId) => {
        const user = await getUser(v);

        return user.role === UserRole.Customer;
      },
    },
    rating: { type: Number, min: 0, max: 5, required: true },
    review: String,
  },
  { timestamps: true },
);

export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
