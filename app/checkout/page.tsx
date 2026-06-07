"use client";
import CartItems from "../components/checkout/cart-items";
import OrderInformation, { OrderFormData } from "../components/checkout/order-information";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { transactionCheckout } from "@/app/services/transaction.service";

const Checkout = () => {
  const { push } = useRouter();
  const { items, reset, setCustomerInfo } = useCartStore();
  const [isFormValid, setIsFormValid] = useState(false);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (isValid: boolean, data: OrderFormData) => {
    setIsFormValid(isValid);
    setOrderData(data);
    
    if (isValid && data) {
      setCustomerInfo({
        customerName: data.fullName,
        customerContact: parseInt(data.waNumber) || null,
        customerAddress: data.address,
      });
    }
  };

  const handleProceedToPayment = async () => {
    if (!isFormValid || !orderData || items.length === 0) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("customerName", orderData.fullName);
      formData.append("customerContact", orderData.waNumber);
      formData.append("customerAddress", orderData.address);
      
      items.forEach((item, index) => {
        formData.append(`items[${index}][productId]`, item._id);
        formData.append(`items[${index}][qty]`, item.qty.toString());
      });
      
      const transaction = await transactionCheckout(formData);
      console.log("Transaction created:", transaction);
      
      localStorage.setItem("sporton-order-data", JSON.stringify(orderData));
      localStorage.setItem("sporton-cart-data", JSON.stringify(items));
      localStorage.setItem("sporton-transaction-id", transaction._id);
      
      reset();
      push("/payment");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Gagal memproses checkout. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
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