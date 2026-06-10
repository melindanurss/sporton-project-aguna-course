"use client";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "../ui/button";
import { FiCreditCard, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import { OrderFormData } from "./order-information";

type TCartItemsProps = {
  isFormValid?: boolean;
  orderData?: OrderFormData | null;
  onProceedToPayment?: () => void;
  isLoading?: boolean;
};

const CartItems = ({ 
  isFormValid = false,
  orderData = null,
  onProceedToPayment,
  isLoading = false
}: TCartItemsProps) => {
  const { push } = useRouter();
  const { items, removeItem, updateQuantity } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    updateQuantity(id, qty);
  };

  if (items.length === 0) {
    return (
      <CardWithHeader title="Cart Items">
        <div className="p-8 text-center text-gray-500">
          <p>Your cart is empty</p>
          <Button variant="primary" className="mt-4" onClick={() => push("/")}>
            Continue Shopping
          </Button>
        </div>
      </CardWithHeader>
    );
  }

  return (
    <CardWithHeader title="Cart Items">
      <div className="overflow-auto max-h-[400px]">
        {items.map((item) => (
          <div className="border-b border-gray-200 p-4 flex gap-3 items-center" key={item._id}>
            <div className="bg-primary-light aspect-square w-16 flex justify-center items-center rounded-lg">
              <Image
                src={getImageUrl(item.imageUrl)}
                width={63}
                height={63}
                alt={item.name}
                className="aspect-square object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-primary text-sm font-semibold">{priceFormatter(item.price)}</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-sm font-medium w-8 text-center">{item.qty}</span>
                <button
                  onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{priceFormatter(item.price * item.qty)}</div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center justify-end w-full"
                aria-label="Remove item"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold mb-4">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xl">{priceFormatter(totalPrice)}</div>
        </div>
        <Button
          variant="dark"
          className={`w-full transition-all duration-300 ${!isFormValid ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          onClick={onProceedToPayment}
          disabled={!isFormValid || isLoading}
        >
          <FiCreditCard size={18} />
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button>
        {!isFormValid && (
          <p className="text-xs text-red-500 text-center mt-2">
            Silakan isi data diri terlebih dahulu (Nama, No. WhatsApp, Alamat)
          </p>
        )}
      </div>
    </CardWithHeader>
  );
};

export default CartItems;