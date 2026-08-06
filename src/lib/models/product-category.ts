export enum ProductCategory {
  Textile = "textile",
  Woodcraft = "woodcraft",
  Ceramics = "ceramics",
  Jewelry = "jewelry",
  Leatherwork = "leatherwork",
  Glass = "glass",
  Metalwork = "metalwork",
  PaperCraft = "paper_craft",
  HomeDecor = "home_decor",
  Artwork = "artwork",
  NaturalCrafts = "natural_crafts",
  Other = "other",
}

/**
 * Turns a stored category value into a human-readable label:
 * "natural_crafts" -> "Natural Crafts". Callers that want all caps
 * apply the `uppercase` class on top.
 */
export function formatCategoryLabel(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
