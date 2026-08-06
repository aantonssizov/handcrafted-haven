"use server";

import dbConnect from "@/lib/mongodb";
import { ObjectId } from "mongoose";
import Product, { IProductFilter } from "@/lib/models/product";
import { ProductCategory } from "@/lib/models/product-category";

export async function getAll() {
  try {
    await dbConnect();
    const products = await Product.find({});
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
    });
    return products;
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
    const products = await Product.find(query);
    return products;
  } catch (err) {
    throw err;
  }
}

export async function get(id: ObjectId) {
  try {
    await dbConnect();
    const product = await Product.findOne({ _id: id })
      .populate("reviews")
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
  seller: ObjectId,
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
