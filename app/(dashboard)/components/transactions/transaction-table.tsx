"use client";

import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { getAllTransactions } from "@/app/services/transaction.service";
import { Transaction } from "@/app/types";
import Swal from "sweetalert2";

type TTransactionTableProps = {
  onViewDetails: (transaction: Transaction) => void;
  refreshTrigger?: number;
};

const TransactionTable = ({ onViewDetails, refreshTrigger = 0 }: TTransactionTableProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTransactions();
      const sortedData = data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTransactions(sortedData);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      await Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: "Could not load transactions.",
        confirmButtonColor: "#ff5f3f",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-300 font-semibold";
      case "rejected": return "bg-red-100 text-red-700 border-red-300 font-semibold";
      case "paid": return "bg-green-100 text-green-700 border-green-300 font-semibold";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Date</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Customer</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Contact</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Total</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Status</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data) => (
            <tr key={data._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-700">{formatDate(data.createdAt)}</td>
              <td className="px-6 py-4 font-medium text-gray-800">{data.customerName}</td>
              <td className="px-6 py-4 text-gray-700">{data.customerContact || "-"}</td>
              <td className="px-6 py-4 font-medium text-gray-800">{priceFormatter(parseInt(data.totalPayment))}</td>
              <td className="px-6 py-4">
                <span className={`px-4 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}`}>
                  {data.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onViewDetails(data)}
                  className="flex items-center gap-2 p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FiEye size={18} />
                  <span className="text-sm font-medium">View Details</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;