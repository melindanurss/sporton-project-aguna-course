"use client";
import CardWithHeader from "../ui/card-with-header";
import { useState, useEffect } from "react";

type OrderInformationProps = {
  onFormChange?: (isValid: boolean, data: OrderFormData) => void;
};

export type OrderFormData = {
  fullName: string;
  waNumber: string;
  address: string;
};

const OrderInformation = ({ onFormChange }: OrderInformationProps) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    waNumber: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const updatedData = {
      ...formData,
      [id === "full_name" ? "fullName" : id === "wa_number" ? "waNumber" : "address"]: value,
    };
    setFormData(updatedData);
    
    const isValid = !!(updatedData.fullName && updatedData.waNumber && updatedData.address);
    onFormChange?.(isValid, updatedData);
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="p-5 space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Type your full name"
            id="full_name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="wa_number" className="block text-sm font-medium mb-1">
            Whatsapp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="+62xxxx"
            id="wa_number"
            value={formData.waNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="shipping_address" className="block text-sm font-medium mb-1">
            Shipping Address <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            id="shipping_address"
            rows={4}
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>
        <p className="text-xs text-gray-400 italic">* Wajib diisi sebelum melanjutkan ke pembayaran</p>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;