import mongoose, { Schema, Types } from "mongoose";
import { ProductCategory } from "./product-category";
import {
  IProductReview,
  ProductReviewSchema,
} from "./product-review";
import { IUser } from "./user";

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
    name: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: Object.values(ProductCategory),
    },

    amountSold: {
      type: Number,
      default: 0,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pictureUrl: String,

    reviews: [ProductReviewSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
  