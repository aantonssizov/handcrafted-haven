"use server";

import { ObjectId } from "mongoose";
import ProductReview from "@/lib/models/product-review";
import dbConnect from "@/lib/mongodb";

export async function create(
  customer: ObjectId,
  product: ObjectId,
  rating: number,
  review: string | undefined,
) {
  let productReview = new ProductReview({
    customer,
    product,
    rating,
    review,
  });

  try {
    await dbConnect();
    productReview = await productReview.save();
  } catch (err) {
    throw err;
  }

  if (productReview._id) return productReview;
  throw new Error("Error creating new product review.");
}

export async function edit(
  id: ObjectId,
  rating?: number,
  review?: string | undefined,
) {
  try {
    await dbConnect();
    const productReview = await ProductReview.findByIdAndUpdate(
      id,
      {
        rating,
        review,
      },
      {
        returnDocument: "after",
      },
    );
    if (productReview._id) return productReview;
    throw new Error("Error editing the product review");
  } catch (err) {
    throw err;
  }
}

export async function remove(id: ObjectId) {
  try {
    await dbConnect();
    await ProductReview.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
