import mongoose from "mongoose";
import { ProductCategories, ProductCategory } from "./product-category";
import { ProductReview, ProductReviewSchema } from "./product-review";

interface Product {
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  amountSold: number;
  pictureUrl: string;
  // seller,
  reviews: ProductReview[];
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
    pictureUrl: String,
    reviews: [ProductReviewSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
