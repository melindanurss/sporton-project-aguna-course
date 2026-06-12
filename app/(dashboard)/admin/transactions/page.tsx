"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { useState } from "react";

const TransactionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  const handleStatusUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable 
        onViewDetails={handleViewDetails} 
        refreshTrigger={refreshTrigger}
      />
      <TransactionModal 
        isOpen={isOpen} 
        onClose={handleCloseModal} 
        transaction={selectedTransaction}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default TransactionManagement;