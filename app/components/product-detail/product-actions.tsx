"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";

const ProductActions = ({ product, stock = 0 }) => {
  const { addItem } = useCartStore();
  const { push } = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isHoveringCheckout, setIsHoveringCheckout] = useState(false);

  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (product && !isOutOfStock) {
      const productToAdd = {
        ...product,
        imageUrl: product.imageUrl || product.imgUrl || "",
      };
      addItem(productToAdd, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const handleCheckoutNow = () => {
    if (product && !isOutOfStock) {
      const productToAdd = {
        ...product,
        imageUrl: product.imageUrl || product.imgUrl || "",
      };
      addItem(productToAdd, qty);
      push("/checkout");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="border border-gray-300 inline-flex w-fit rounded-lg overflow-hidden">
        <div className="w-12 h-12 flex items-center justify-center border-r border-gray-300 font-medium text-lg">
          {qty}
        </div>
        <div className="flex flex-col">
          <button
            className="w-8 h-6 flex items-center justify-center border-b border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setQty(qty + 1)}
            disabled={isOutOfStock}
          >
            <FiChevronUp size={14} />
          </button>
          <button
            className="w-8 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            disabled={isOutOfStock}
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`
          flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium
          transition-all duration-300 transform
          ${isOutOfStock 
            ? "bg-gray-400 cursor-not-allowed opacity-50" 
            : added 
              ? "bg-green-500 text-white scale-105" 
              : "bg-primary text-white hover:bg-primary/85 hover:scale-105 active:scale-95"
          }
        `}
      >
        {added ? <FiCheck size={20} className="animate-pulse" /> : <FiShoppingBag size={20} />}
        <span>{isOutOfStock ? "Out of Stock" : (added ? "Added to Cart" : "Add to Cart")}</span>
      </button>

      <button
        onClick={handleCheckoutNow}
        disabled={isOutOfStock}
        onMouseEnter={() => setIsHoveringCheckout(true)}
        onMouseLeave={() => setIsHoveringCheckout(false)}
        className={`
          flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium
          transition-all duration-300 transform
          ${isOutOfStock 
            ? "bg-gray-400 cursor-not-allowed opacity-50" 
            : "bg-dark text-white hover:bg-primary hover:scale-105 hover:shadow-lg active:scale-95"
          }
        `}
      >
        <span>Checkout Now</span>
        <FiArrowRight 
          size={20} 
          className={`transition-all duration-300 ${isHoveringCheckout && !isOutOfStock ? "translate-x-1" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

export default ProductActions;