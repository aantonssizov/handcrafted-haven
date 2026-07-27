export const ProductCategories = [
  "textile",
  "pottery",
  "ceramic",
  "woodcraft",
] as const;

export type ProductCategory = (typeof ProductCategories)[number];
