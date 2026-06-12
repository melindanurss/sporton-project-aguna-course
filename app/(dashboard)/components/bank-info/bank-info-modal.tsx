"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import { useState } from "react";
import Swal from "sweetalert2";
import { createBank } from "@/app/services/bank.service";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBankAdded?: () => void;
};

const BankInfoModal = ({ isOpen, onClose, onBankAdded }: TBankInfoModalProps) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setBankName("");
    setAccountNumber("");
    setAccountName("");
  };

  const handleSubmit = async () => {
    if (!bankName || !accountNumber || !accountName) {
      await Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    setIsLoading(true);

    try {
      await createBank({
        bankName: bankName,
        accountNumber: accountNumber,
        accountName: accountName,
      });
      
      await Swal.fire({
        icon: "success",
        title: "Bank Account Added!",
        text: `"${bankName}" bank account has been added successfully.`,
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#22c55e",
      });
      
      resetForm();
      onBankAdded?.();
      onClose();
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Creation Failed!",
        text: error.message || "Could not add bank account.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 w-full">
          <div className="input-group-admin">
            <label htmlFor="bankName" className="text-sm font-bold text-gray-800">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e. g. Mandiri, BCA, BRI"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="input-group-admin">
            <label htmlFor="accountNumber" className="text-sm font-bold text-gray-800">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="input-group-admin">
            <label htmlFor="accountName" className="text-sm font-bold text-gray-800">Account Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Holder Name as registered on the account"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="ghost"
            className="rounded-lg px-6 py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="rounded-lg px-6 py-2"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Bank Account"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BankInfoModal;