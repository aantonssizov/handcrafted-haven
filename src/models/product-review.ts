import mongoose from "mongoose";

export interface ProductReview {
  // customer
  rating: number;
  review?: string;
}

export const ProductReviewSchema = new mongoose.Schema<ProductReview>(
  {
    rating: { type: Number, min: 0, max: 5, required: true },
    review: String,
  },
  { timestamps: true },
);

export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
