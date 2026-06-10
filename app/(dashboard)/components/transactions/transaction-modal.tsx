"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
};

const productData = [
  {
    id: 1,
    name: "SportOn FootFastball V1",
    imageUrl: "/images/SportOn FootFastball V1.png",
    price: 289000,
    qty: 2,
  },
  {
    id: 2,
    name: "SportOn HyperFast V2",
    imageUrl: "/images/SportOn HyperFast V2.png",
    price: 229000,
    qty: 1,
  },
  {
    id: 3,
    name: "SportOn FootFastball V3",
    imageUrl: "/images/SportOn FootFastball V3.png",
    price: 289000,
    qty: 3,
  },
];

const TransactionModal = ({ isOpen, onClose, transaction }: TTransactionModalProps) => {
  const totalPrice = productData.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <h4 className="font-bold text-sm text-gray-800 mb-2">Payment Proof</h4>
          <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
            <Image
              src="/images/payment-proof-dummy.png"
              alt="payment proof"
              width={200}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        
        <div className="md:w-3/5">
          <h4 className="font-bold text-sm text-gray-800 mb-2">Order Details</h4>
          <div className="bg-gray-50 rounded-lg p-4 text-sm mb-5 space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">23/02/2026 19:32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium text-gray-800">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Contact</span>
              <span className="font-medium text-gray-800">+628123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping Address</span>
              <span className="font-medium text-gray-800 text-right">Merdeka Street, Jakarta, Indonesia, 332122</span>
            </div>
          </div>

          <h4 className="font-bold text-sm text-gray-800 mb-2">Items Purchased</h4>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 mb-4">
            {productData.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    width={36}
                    height={36}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">{priceFormatter(item.price)}</div>
                </div>
                <div className="text-sm text-gray-600">{item.qty} units</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <h4 className="font-bold text-sm text-gray-800">Total</h4>
            <div className="text-primary font-bold text-lg">
              {priceFormatter(totalPrice)}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="danger"
              size="small"
              className="rounded-lg px-4 py-2"
            >
              <FiX size={16} className="mr-1" />
              Reject
            </Button>
            <Button
              variant="success"
              size="small"
              className="rounded-lg px-4 py-2"
            >
              <FiCheck size={16} className="mr-1" />
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;