"use server";

import dbConnect from "@/lib/mongodb";
import { ObjectId } from "mongoose";
import Product, { IProductFilter } from "@/lib/models/product";
import { ProductCategory } from "@/lib/models/product-category";
import { combineProductRatings, IRatingSummary } from "@/lib/rating";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserRole } from "@/lib/models/roles";

export async function getAll() {
  try {
    await dbConnect();
    const products = await Product.find({})
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    return products;
  } catch (err) {
    throw err;
  }
}

export async function getAllBySeller(sellerId: ObjectId | string) {
  try {
    await dbConnect();
    const products = await Product.find({
      seller: sellerId,
    }).sort({ createdAt: -1 });
    return products;
  } catch (err) {
    throw err;
  }
}

export async function getSellerRatings(sellerIds: (ObjectId | string)[]) {
  const ratings: Record<string, IRatingSummary> = {};

  if (sellerIds.length === 0) {
    return ratings;
  }

  try {
    await dbConnect();
    const products = await Product.find({ seller: { $in: sellerIds } })
      .select("seller ratingAverage ratingCount")
      .lean<
        { seller: unknown; ratingAverage: number; ratingCount: number }[]
      >();

    const productsBySeller: Record<
      string,
      { ratingAverage: number; ratingCount: number }[]
    > = {};

    for (const product of products) {
      const sellerId = String(product.seller);

      if (productsBySeller[sellerId] === undefined) {
        productsBySeller[sellerId] = [];
      }

      productsBySeller[sellerId].push(product);
    }

    for (const sellerId of Object.keys(productsBySeller)) {
      ratings[sellerId] = combineProductRatings(productsBySeller[sellerId]);
    }

    return ratings;
  } catch (err) {
    throw err;
  }
}

export async function getByFilter(filter: IProductFilter) {
  const { searchQuery, categories, minPrice, maxPrice } = filter;

  const query: Record<string, unknown> = {};

  if (searchQuery) {
    query.name = { $regex: searchQuery, $options: "i" };
  }

  if (categories && categories.length > 0) {
    query.category = { $in: categories };
  }

  const priceQuery: Record<string, number> = {};

  if (minPrice !== undefined && !Number.isNaN(minPrice)) {
    priceQuery.$gte = minPrice;
  }

  if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
    priceQuery.$lte = maxPrice;
  }

  if (Object.keys(priceQuery).length > 0) {
    query.price = priceQuery;
  }

  try {
    await dbConnect();
    const products = await Product.find(query).populate("seller", "name");
    return products;
  } catch (err) {
    throw err;
  }
}

export async function get(id: ObjectId | string) {
  try {
    await dbConnect();
    const product = await Product.findOne({ _id: id })
      .populate("seller", "name email role")
      .exec();
    return product;
  } catch (err) {
    throw err;
  }
}

export async function create(
  name: string,
  description: string | undefined,
  price: number,
  category: ProductCategory,
  amountSold: number,
  pictureUrl: string,
  seller: ObjectId | string,
) {
  let product = new Product({
    name,
    description,
    price,
    category,
    amountSold,
    pictureUrl,
    seller,
  });

  try {
    await dbConnect();

    product = await product.save();
  } catch (err) {
    throw err;
  }

  if (product._id) {
    return product;
  }
  throw new Error("Error creating new product.");
}

export async function update(
  id: ObjectId,
  name?: string,
  description?: string,
  price?: number,
  category?: ProductCategory,
  amountSold?: number,
  pictureUrl?: string,
) {
  try {
    await dbConnect();
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        amountSold,
        pictureUrl,
      },
      {
        returnDocument: "after",
      },
    );

    if (product) return product;
    throw new Error("Error updating the document.");
  } catch (err) {
    throw err;
  }
}

export async function remove(id: ObjectId) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
  return "Product removed successfully";
}

async function uploadProductImage(formData: FormData, fallbackUrl?: string) {
  const imageFile = formData.get("image");

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploadsPath = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsPath, { recursive: true });

    const safeName = String(imageFile.name)
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsPath, filename);
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    await fs.writeFile(filePath, fileBuffer);

    return `/uploads/${filename}`;
  }

  return fallbackUrl || "";
}

export async function createProductAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await getSession();

  if (!session.userId) {
    return "Please log in to create a product.";
  }

  if (session.userRole !== UserRole.Seller) {
    return "Only sellers can create products.";
  }

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const category = String(formData.get("category") || ProductCategory.Other) as ProductCategory;
  const amountSold = Number(formData.get("amountSold") || 0);
  const pictureUrl = await uploadProductImage(formData);

  if (!name || !price) {
    return "Please provide a product name and price.";
  }

  const product = await create(
    name,
    description || undefined,
    price,
    category,
    amountSold,
    pictureUrl,
    session.userId,
  );

  redirect(`/products/${String(product._id)}`);
}

export async function updateProductAction(
  productId: string,
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await getSession();

  if (!session.userId) {
    return "Please log in to update this product.";
  }

  if (session.userRole !== UserRole.Seller) {
    return "Only sellers can edit products.";
  }

  const existingProduct = await Product.findOne({
    _id: productId,
    seller: session.userId,
  });

  if (!existingProduct) {
    return "You can only edit your own products.";
  }

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price") || 0);
  const category = String(formData.get("category") || ProductCategory.Other) as ProductCategory;
  const amountSold = Number(formData.get("amountSold") || existingProduct.amountSold || 0);
  const pictureUrl = await uploadProductImage(formData, existingProduct.pictureUrl);

  if (!name || !price) {
    return "Please provide a product name and price.";
  }

  const product = await update(
    existingProduct._id as ObjectId,
    name,
    description || undefined,
    price,
    category,
    amountSold,
    pictureUrl,
  );

  redirect(`/products/${String(product._id)}`);
}

export async function deleteProductAction(productId: string) {
  const session = await getSession();

  if (!session.userId) {
    return;
  }

  if (session.userRole !== UserRole.Seller) {
    return;
  }

  const product = await Product.findOne({
    _id: productId,
    seller: session.userId,
  });

  if (!product) {
    return;
  }

  await remove(product._id as ObjectId);
  redirect("/dashboard");
}
