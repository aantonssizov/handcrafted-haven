import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "@/lib/models/user";
import { getUser } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";
import { IProduct } from "@/lib/models/product";

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
      validate: async (v: ObjectId) => {
        const user = await getUser(v);

        return user.role === UserRole.Customer;
      },
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
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

ProductReviewSchema.index({ product: 1, createdAt: -1 });

export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
