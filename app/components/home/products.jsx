"use client";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";
import priceFormatter from "@/app/utils/price-formatter";

const ProductsSection = ({ products }) => {
  const { addItem } = useCartStore();
  const [addedProducts, setAddedProducts] = useState({});

  const targetProducts = [
    { name: "SportOn HyperFast V2", category: "Running", price: 568000 },
    { name: "SportOn FootFastball V3", category: "Football", price: 599000 },
    { name: "SportOn Hypershirt Black", category: "Running", price: 330000 },
    { name: "SportOn AirFlow Shirt", category: "Running", price: 230000 },
    { name: "Raket Green Tennis", category: "Tennis", price: 300000 },
    { name: "baju bola ijo", price: 300000 },
    { name: "Testing", price: 5000 },
    { name: "Tennis Racket testing", price: 200000 },
  ];

  const filteredProducts = products?.filter(product => 
    targetProducts.some(target => target.name === product.name)
  ) || [];

  const sortedProducts = targetProducts.map(target => 
    filteredProducts.find(p => p.name === target.name)
  ).filter(Boolean);

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

  if (sortedProducts.length === 0) {
    return (
      <section id="products-section" className="container mx-auto mt-32 mb-20">
        <h2 className="font-bold italic text-4xl text-center mb-11">
          <span className="text-primary">OUR </span>PRODUCTS
        </h2>
        <div className="text-center py-10">Loading products...</div>
      </section>
    );
  }

  return (
    <section id="products-section" className="container mx-auto mt-32 mb-20">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {sortedProducts.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300 cursor-pointer block group"
          >
            <div className="relative">
              <div 
                className="bg-primary-light w-full aspect-square relative overflow-hidden"
                style={{ 
                  backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <Button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`absolute right-3 top-3 transition-all duration-300 z-10 ${
                    addedProducts[product._id] 
                      ? 'bg-green-500 scale-110' 
                      : 'bg-orange-500 hover:bg-orange-600 hover:scale-110'
                  } text-white! shadow-lg`}
                  style={{
                    width: 39.75,
                    height: 39.75,
                    borderRadius: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 32,
                  }}
                >
                  {addedProducts[product._id] ? (
                    <FiCheck size={24} className="animate-pulse" />
                  ) : (
                    <FiPlus size={24} />
                  )}
                </Button>
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Quick Add
                  </span>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">{product.category?.name}</div>
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