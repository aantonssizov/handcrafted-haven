"use server";

import { ObjectId } from "mongoose";
import ProductReview from "@/lib/models/product-review";
import Product from "@/lib/models/product";
import dbConnect from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";

export async function recalculateProductRating(productId: ObjectId | string) {
  try {
    await dbConnect();
    const reviews = await ProductReview.find({ product: productId })
      .select("rating")
      .lean<{ rating: number }[]>();

    const ratingCount = reviews.length;
    const ratingAverage =
      ratingCount === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount;

    await Product.findByIdAndUpdate(productId, { ratingAverage, ratingCount });
  } catch (err) {
    throw err;
  }
}

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

  if (!productReview._id) {
    throw new Error("Error creating new product review.");
  }

  await recalculateProductRating(product);

  return productReview;
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
    if (!productReview) {
      throw new Error("Error editing the product review");
    }

    await recalculateProductRating(productReview.product);

    return productReview;
  } catch (err) {
    throw err;
  }
}

export async function remove(id: ObjectId) {
  try {
    await dbConnect();
    const productReview = await ProductReview.findByIdAndDelete(id);

    if (productReview) {
      await recalculateProductRating(productReview.product);
    }
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
