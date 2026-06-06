"use client";

import Image from "next/image";
import Button from "../ui/button";
import { FiRefreshCw } from "react-icons/fi";
import { useRouter } from "next/navigation";

const OrderSubmitted = () => {
  const { push } = useRouter();

  const refreshOrderStatus = () => {
    push("/order-status/confirmed");
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-12 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
      <Image
        src="/images/icon-order-submitted.svg"
        width={100}
        height={100}
        alt="order submitted"
        className="mb-6"
      />
      <h2 className="text-3xl font-bold text-orange-500 mb-3">Order Submitted!!</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Your order is recorded in our system. We are still confirming the
        payment status. Please wait and your order status will be updated in
        less than 12 hours.
      </p>
      <Button variant="dark" className="w-full" onClick={refreshOrderStatus}>
        <FiRefreshCw />
        Refresh Order Status
      </Button>
    </div>
  );
};

export default OrderSubmitted;