"use client";

import { useParams } from "next/navigation";
import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";

export default function OrderStatusDetail() {
  const { id } = useParams();
  
  const isConfirmed = id === "confirmed";

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