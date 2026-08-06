export interface IRatingSummary {
  average: number;
  count: number;
}

export function combineProductRatings(
  products: { ratingAverage: number; ratingCount: number }[],
): IRatingSummary {
  const count = products.reduce(
    (sum, product) => sum + (product.ratingCount || 0),
    0,
  );

  if (count === 0) {
    return { average: 0, count: 0 };
  }

  const total = products.reduce(
    (sum, product) =>
      sum + (product.ratingAverage || 0) * (product.ratingCount || 0),
    0,
  );

  return { average: total / count, count };
}
