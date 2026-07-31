import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { ProductCategory } from "@/lib/models/product-category";
import {
  IProductReview,
  ProductReviewSchema,
} from "@/lib/models/product-review";
import { getUser } from "../../../backend/src/actions/user";
import { UserRole } from "@/lib/models/roles";
import { IUser } from "@/lib/models/user";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  amountSold: number;
  pictureUrl: string;
  seller: Types.ObjectId | IUser;
  reviews: IProductReview[];
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    category: {
      type: String,
      enum: Object.values(ProductCategory),
    },
    amountSold: Number,
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: async (v: ObjectId) => {
        const user = await getUser(v);

        return user.role === UserRole.Seller;
      },
    },
    pictureUrl: String,
    reviews: [ProductReviewSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
