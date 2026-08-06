import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { ProductCategory } from "./product-category";
import { getUser } from "@/actions/user";
import { UserRole } from "@/lib/models/roles";
import { IUser } from "@/lib/models/user";

export interface IProduct {
  _id: ObjectId | string;
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  amountSold: number;
  pictureUrl: string;
  seller: Types.ObjectId | string | IUser;
}

export interface IProductFilter {
  searchQuery?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
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
      validate: async (v: ObjectId) => {
        const user = await getUser(v);

        return user.role === UserRole.Seller;
      },
    },
    pictureUrl: String,
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
