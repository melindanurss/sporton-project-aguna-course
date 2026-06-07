"use client";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import { useState } from "react";

const CartPopup = ({ onClose }: { onClose?: () => void }) => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    push("/checkout");
    onClose?.();
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  if (items.length === 0) {
    return (
      <div className="bg-white shadow-xl border border-gray-200 w-96 z-10 rounded-xl">
        <div className="p-4 border-b border-gray-200 font-bold text-center flex justify-between items-center">
          <span>Shopping Cart</span>
          <button onClick={onClose} className="text-gray-400 hover:text-primary text-xl">&times;</button>
        </div>
        <div className="p-8 text-center text-gray-500">
          <p>Your cart is empty</p>
          <Button variant="primary" className="mt-4" onClick={onClose}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl border border-gray-200 w-96 z-10 rounded-xl">
      <div className="p-4 border-b border-gray-200 font-bold text-center flex justify-between items-center">
        <span>Shopping Cart</span>
        <button onClick={onClose} className="text-gray-400 hover:text-primary text-xl">&times;</button>
      </div>
      <div className="max-h-96 overflow-auto">
        {items.map((item) => {
          const imageUrl = getImageUrl(item.imageUrl);
          const hasError = imageErrors[item._id];
          
          return (
            <div className="border-b border-gray-200 p-4 flex gap-3 items-center" key={item._id}>
              <div className="bg-primary-light w-16 h-16 flex justify-center items-center rounded-lg overflow-hidden flex-shrink-0">
                {!hasError && imageUrl ? (
                  <Image
                    src={imageUrl}
                    width={64}
                    height={64}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(item._id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                    {item.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.name}</div>
                <div className="text-primary text-sm font-semibold">{priceFormatter(item.price)}</div>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  <span>Qty: {item.qty}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-sm">{priceFormatter(item.price * item.qty)}</div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-700 mt-2 block ml-auto"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold mb-4">
          <div className="text-sm">Total</div>
          <div className="text-primary text-lg">{priceFormatter(totalPrice)}</div>
        </div>
        <Button variant="dark" size="small" className="w-full" onClick={handleCheckout}>
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;