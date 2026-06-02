"use client";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus, FiCheck } from "react-icons/fi";
import { productList } from "../../utils/products-data";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const ProductsSection = () => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Mencegah navigasi ke halaman product
    e.stopPropagation(); // Mencegah event bubbling
    
    addToCart(product, 1);
    
    // Tampilkan feedback animasi pada tombol
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    
    // Reset animasi tombol
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  return (
    <section id="products-section" className="container mx-auto mt-32 mb-20">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {productList.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300 cursor-pointer block group"
          >
            <div className="relative">
              <div 
                className="bg-primary-light w-full aspect-square relative overflow-hidden"
                style={{ 
                  backgroundImage: `url('/images/${product.imgUrl}')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                {/* Tombol + Dinamis */}
                <Button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`absolute right-3 top-3 transition-all duration-300 z-10 ${
                    addedProducts[product.id] 
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
                  {addedProducts[product.id] ? (
                    <FiCheck size={24} className="animate-pulse" />
                  ) : (
                    <FiPlus size={24} />
                  )}
                </Button>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Quick Add
                  </span>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">{product.category}</div>
              <div className="font-medium text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;