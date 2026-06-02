"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import { Suspense } from "react";

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "confirmed") {
      setIsConfirmed(true);
      // Clear cart after order confirmed
      localStorage.removeItem("sporton-cart");
      localStorage.removeItem("sporton-order-data");
    }
  }, [searchParams]);

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        <div className="flex justify-center">
          {isConfirmed ? <OrderConfirmed /> : <OrderSubmitted />}
        </div>
      </div>
    </main>
  );
}

const OrderStatus = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatusContent />
    </Suspense>
  );
};

export default OrderStatus;