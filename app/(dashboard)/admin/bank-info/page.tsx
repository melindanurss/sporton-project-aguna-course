"use client";

import Button from "@/app/(website)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";

const BankInfoManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState([]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleBankAdded = (newBank: any) => {
    setBanks((prev) => [...prev, newBank]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button variant="primary" className="rounded-lg" onClick={() => setIsOpen(true)}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList onBanksUpdate={setBanks} />
      <BankInfoModal isOpen={isOpen} onClose={handleCloseModal} onBankAdded={handleBankAdded} />
    </div>
  );
};

export default BankInfoManagement;