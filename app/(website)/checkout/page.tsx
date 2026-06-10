"use client";

import CartItems from "../components/checkout/cart-items";
import OrderInformation, { OrderFormData } from "../components/checkout/order-information";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../hooks/use-cart-store";

const Checkout = () => {
  const { push } = useRouter();
  const { setCustomerInfo } = useCartStore();
  const [isFormValid, setIsFormValid] = useState(false);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (isValid: boolean, data: OrderFormData) => {
    setIsFormValid(isValid);
    setOrderData(data);
  };

  const handleProceedToPayment = () => {
    if (!isFormValid || !orderData) return;
    
    setIsLoading(true);
    
    setCustomerInfo({
      customerName: orderData.fullName,
      customerContact: parseInt(orderData.waNumber) || null,
      customerAddress: orderData.address,
    });
    
    localStorage.setItem("sporton-order-data", JSON.stringify(orderData));
    
    setIsLoading(false);
    push("/payment");
  };

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Checkout Now</h1>
        <div className="grid grid-cols-2 gap-14">
          <OrderInformation onFormChange={handleFormChange} />
          <CartItems 
            isFormValid={isFormValid} 
            orderData={orderData}
            onProceedToPayment={handleProceedToPayment}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default Checkout;