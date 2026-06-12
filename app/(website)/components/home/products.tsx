"use client";
import Link from "next/link";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";
import priceFormatter from "@/app/utils/price-formatter";

const ProductsSection = ({ products }) => {
  const { addItem } = useCartStore();
  const [addedProducts, setAddedProducts] = useState({});

  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    const productToAdd = {
      ...product,
      imageUrl: product.imageUrl || product.imgUrl || "",
    };
    addItem(productToAdd, 1);
    
    setAddedProducts(prev => ({ ...prev, [product._id]: true }));
    
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product._id]: false }));
    }, 1000);
  };

  if (!products || products.length === 0) {
    return (
      <section id="products-section" className="container mx-auto mt-32 mb-20">
        <h2 className="font-bold italic text-4xl text-center mb-11">
          <span className="text-primary">OUR </span>PRODUCTS
        </h2>
        <div className="text-center py-10 text-gray-500">No products found.</div>
      </section>
    );
  }

  return (
    <section id="products-section" className="container mx-auto mt-32 mb-20">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300 cursor-pointer block group"
          >
            <div className="relative">
              <div 
                className="bg-primary-light w-full aspect-square relative overflow-hidden rounded-lg"
                style={{ 
                  backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`absolute right-3 top-3 transition-all duration-300 z-10 w-10 h-10 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg hover:scale-105 ${
                    addedProducts[product._id] 
                      ? 'bg-green-500' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  } text-white`}
                >
                  {addedProducts[product._id] ? (
                    <FiCheck size={24} className="animate-pulse" />
                  ) : (
                    <FiPlus size={24} />
                  )}
                </button>
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Quick Add
                  </span>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4 line-clamp-1">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500 text-sm">{product.category?.name || "Uncategorized"}</div>
              <div className="font-medium text-primary">
                {priceFormatter(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;