import mongoose from "mongoose";
import { ProductCategories, ProductCategory } from "./product-category";

interface Product {
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  amountSold: number;
  picture: string;
  // seller
}

const ProductSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    category: {
      type: String,
      enum: ProductCategories,
    },
    amountSold: Number,
    // seller
    picture: String,
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
