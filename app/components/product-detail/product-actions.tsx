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
import { useCart } from "../../context/CartContext";

type TProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  imgUrl: string;
  description: string;
};

const ProductActions = ({ product }: { product?: TProduct }) => {
  const { push } = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isHoveringCheckout, setIsHoveringCheckout] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      // Konversi TProduct ke format yang sesuai dengan CartItem
      addToCart(
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          imgUrl: product.imgUrl,
          qty: qty,
        },
        qty
      );
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const handleCheckoutNow = () => {
    if (product) {
      // Konversi TProduct ke format yang sesuai dengan CartItem
      addToCart(
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          imgUrl: product.imgUrl,
          qty: qty,
        },
        qty
      );
      // Langsung redirect ke halaman checkout
      push("/checkout");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="border border-gray-300 inline-flex w-fit rounded-lg overflow-hidden">
        <div className="w-12 h-12 flex items-center justify-center border-r border-gray-300 font-medium text-lg">
          {qty}
        </div>
        <div className="flex flex-col">
          <button
            className="w-8 h-6 flex items-center justify-center border-b border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={() => setQty(qty + 1)}
          >
            <FiChevronUp size={14} />
          </button>
          <button
            className="w-8 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`
          flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium
          transition-all duration-300 transform
          ${added 
            ? "bg-green-500 text-white scale-105" 
            : "bg-primary text-white hover:bg-primary/85 hover:scale-105 active:scale-95"
          }
        `}
      >
        {added ? <FiCheck size={20} className="animate-pulse" /> : <FiShoppingBag size={20} />}
        <span>{added ? "Added to Cart" : "Add to Cart"}</span>
      </button>

      {/* Checkout Now Button */}
      <button
        onClick={handleCheckoutNow}
        onMouseEnter={() => setIsHoveringCheckout(true)}
        onMouseLeave={() => setIsHoveringCheckout(false)}
        className="
          flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium
          bg-dark text-white
          transition-all duration-300 transform
          hover:bg-primary hover:scale-105 hover:shadow-lg
          active:scale-95
        "
      >
        <span>Checkout Now</span>
        <FiArrowRight 
          size={20} 
          className={`transition-all duration-300 ${isHoveringCheckout ? "translate-x-1" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

export default ProductActions;