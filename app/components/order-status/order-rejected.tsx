"use client";

import Image from "next/image";
import Button from "../ui/button";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";

const OrderRejected = () => {
  const { push } = useRouter();

  return (
    <div className="bg-white max-w-2xl mx-auto p-12 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
      <div className="w-24 h-24 bg-primary-light rounded-full mx-auto flex justify-center items-center text-primary mb-6">
        <FiAlertCircle size={52} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Order Rejected!</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        We're sorry, your order has been rejected because the payment proof you
        provided is not valid. Please contact our customer support for further
        assistance.
      </p>
      <Button variant="dark" className="w-full" onClick={() => push("/")}>
        <FiHome />
        Back to Home
      </Button>
    </div>
  );
};

export default OrderRejected;