"use server";

import { ObjectId } from "mongoose";
import ProductReview from "@/lib/models/product-review";
import dbConnect from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";

export async function create(
  customer: ObjectId | string,
  product: ObjectId | string,
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

export async function getByProduct(productId: ObjectId | string) {
  await dbConnect();

  return ProductReview.find({ product: productId })
    .populate("customer", "name")
    .sort({ createdAt: -1 })
    .lean();
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

export async function createReviewAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await getSession();

  if (!session.userId) {
    return "Please log in to leave a review.";
  }

  if (session.userRole !== UserRole.Customer) {
    return "Only customers can leave reviews.";
  }

  const productId = String(formData.get("productId") || "").trim();
  const rating = Number(formData.get("rating") || 0);
  const review = String(formData.get("review") || "").trim();

  if (!productId || !rating || rating < 1 || rating > 5) {
    return "Please select a valid rating.";
  }

  await create(session.userId, productId, rating, review || undefined);
  redirect(`/products/${productId}`);
}
