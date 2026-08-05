"use client";

import { useState, useMemo } from "react";

// Mock Data
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Handcrafted Ceramic Mug",
    category: "ceramics",
    price: 25,
    artisanName: "Sarah Smith",
    image: "/images/logo.webp",
  },
  {
    id: "2",
    title: "Carved Wooden Serving Board",
    category: "woodwork",
    price: 65,
    artisanName: "James M.",
    image: "/images/logo.webp",
  },
  {
    id: "3",
    title: "Handmade Silver Necklace",
    category: "jewelry",
    price: 120,
    artisanName: "Elena R.",
    image: "/images/logo.webp",
  },
  {
    id: "4",
    title: "Woven Cotton Tapestry",
    category: "textiles",
    price: 45,
    artisanName: "Marcus B.",
    image: "/images/logo.webp",
  },
  {
    id: "5",
    title: "Clay Vase Set",
    category: "ceramics",
    price: 85,
    artisanName: "Sarah Smith",
    image: "/images/logo.webp",
  },
];

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategory, maxPrice, searchQuery]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter Controls */}
      <aside className="w-full md:w-64 p-5 border border-slate-800 rounded-xl bg-slate-900/60 h-fit">
        <h2 className="font-semibold text-lg mb-4 text-white">
          Filter Catalog
        </h2>

        {/* Search */}
        <div className="mb-5">
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-sm text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Categories</option>
            <option value="ceramics">Ceramics</option>
            <option value="woodwork">Woodwork</option>
            <option value="jewelry">Jewelry</option>
            <option value="textiles">Textiles</option>
          </select>
        </div>

        {/* Price Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-wider text-slate-400">
              Max Price
            </label>
            <span className="text-sm font-semibold text-amber-400">
              ${maxPrice}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-amber-400 bg-slate-950 cursor-pointer"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedCategory("all");
            setMaxPrice(150);
            setSearchQuery("");
          }}
          className="w-full py-2 px-4 bg-slate-800 text-slate-200 text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-slate-700 transition"
        >
          Reset Filters
        </button>
      </aside>

      {/* Product Display Grid */}
      <section className="flex-1">
        <div className="mb-4 text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-amber-400">
            {filteredProducts.length}
          </span>{" "}
          handcrafted items
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            <p className="text-slate-400">
              No handcrafted items match your filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/80 hover:border-slate-700 transition group"
              >
                <div className="h-48 bg-slate-950 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    By {product.artisanName}
                  </p>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-xl font-bold text-white">
                      ${product.price}
                    </span>
                    <button className="px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-amber-300 transition">
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
