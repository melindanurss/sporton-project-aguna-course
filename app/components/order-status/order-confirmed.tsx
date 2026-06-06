"use client";

import Image from "next/image";
import Button from "../ui/button";
import { FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";

const OrderConfirmed = () => {
  const { push } = useRouter();

  return (
    <div className="bg-white max-w-2xl mx-auto p-12 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
      <Image
        src="/images/icon-order-confirmed.svg"
        width={100}
        height={100}
        alt="order confirmed"
        className="mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        We have received your payment, and your order is currently processed by
        our staff. Just wait until your favorite sportswear arrives at your home.
        We will contact you on WhatsApp for further shipping updates.
      </p>
      <Button variant="dark" className="w-full" onClick={() => push("/")}>
        <FiHome />
        Back to Home
      </Button>
    </div>
  );
};

export default OrderConfirmed;