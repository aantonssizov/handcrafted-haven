import type { MetadataRoute } from "next";
import { getAll } from "@/actions/product";
import { getAllSellerProfiles } from "@/actions/seller-profile";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/products", "/artists", "/login", "/register"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    }),
  );

  try {
    const [products, profiles] = await Promise.all([
      getAll(),
      getAllSellerProfiles(),
    ]);

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${String(product._id)}`,
      lastModified: product.updatedAt || new Date(),
    }));

    const sellerRoutes = profiles.map((profile) => ({
      url: `${baseUrl}/seller/${String(
        typeof profile.seller === "object" && profile.seller?._id
          ? profile.seller._id
          : profile.seller,
      )}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...productRoutes, ...sellerRoutes];
  } catch {
    return staticRoutes;
  }
}
