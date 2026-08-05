import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Handwoven Basket",
    description:
      "A beautifully handwoven basket made from natural raffia.",
    price: 12500,
    image: "/images/products/basket.jpg",
    category: "Home Decor",
    seller: "Grace Crafts",
    rating: 4.8,
    reviewCount: 18,
  },
  {
    id: "2",
    name: "Beaded Necklace",
    description:
      "A colorful handmade beaded necklace crafted by local artisans.",
    price: 6500,
    image: "/images/products/necklace.jpg",
    category: "Jewelry",
    seller: "African Beads",
    rating: 4.5,
    reviewCount: 10,
  },
  {
    id: "3",
    name: "Wooden Carving",
    description:
      "Hand-carved wooden sculpture made from sustainable hardwood.",
    price: 18500,
    image: "/images/products/carving.jpg",
    category: "Art",
    seller: "Heritage Woodworks",
    rating: 4.9,
    reviewCount: 25,
  },
];
