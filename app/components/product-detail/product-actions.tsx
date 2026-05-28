"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type TProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  imgUrl: string;
  description: string;
};

const ProductActions = ({
  onAddToCart,
  product,
}: {
  onAddToCart?: (qty: number, product?: TProduct) => void;
  product?: TProduct;
}) => {
  const { push } = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart?.(qty, product);
    setTimeout(() => setAdded(false), 1500);
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
            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button className="flex-1" onClick={handleAddToCart}>
        {added ? <FiCheck size={20} /> : <FiShoppingBag size={20} />}
        {added ? "Added to Cart" : "Add to Cart"}
      </Button>

      {/* Checkout Now Button */}
      <Button variant="dark" className="flex-1" onClick={() => push("/checkout")}>
        Checkout Now
        <FiArrowRight size={20} />
      </Button>
    </div>
  );
};

export default ProductActions;