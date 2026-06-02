"use client";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

const CartPopup = ({ onClose }: { onClose?: () => void }) => {
  const { push } = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const totalPrice = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="bg-white shadow-xl border border-gray-200 w-96 z-10 rounded-xl">
        <div className="p-4 border-b border-gray-200 font-bold text-center flex justify-between items-center">
          <span>Shopping Cart</span>
          <button onClick={onClose} className="text-gray-400 hover:text-primary text-xl">&times;</button>
        </div>
        <div className="p-8 text-center text-gray-500">
          <FiShoppingBag size={48} className="mx-auto mb-3 text-gray-300" />
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
        {cart.map((item) => (
          <div className="border-b border-gray-200 p-4 flex gap-3" key={item.id}>
            <div className="bg-primary-light aspect-square w-16 flex justify-center items-center rounded-lg">
              <Image src={`/images/${item.imgUrl}`} width={63} height={63} alt={item.name} className="aspect-square object-contain" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-primary text-sm font-semibold">{priceFormatter(item.price)}</div>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100">
                  <FiMinus size={10} />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100">
                  <FiPlus size={10} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">{priceFormatter(item.price * item.qty)}</div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-2 block ml-auto">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold mb-4">
          <div className="text-sm">Total</div>
          <div className="text-primary text-lg">{priceFormatter(totalPrice)}</div>
        </div>
        <Button variant="dark" size="small" className="w-full" onClick={() => { push("/checkout"); onClose?.(); }}>
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;