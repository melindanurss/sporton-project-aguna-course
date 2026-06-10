"use client";

import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

const transactionData = [
  { id: 1, date: "23/02/2026 19:32", customer: "John Doe", contact: "08123456789", total: 1500000, status: "pending" },
  { id: 2, date: "23/02/2026 13:32", customer: "Delon Marx", contact: "08987654321", total: 2500000, status: "rejected" },
  { id: 3, date: "23/02/2026 15:32", customer: "Ed Warren", contact: "08567482920", total: 1000000, status: "paid" },
];

type TTransactionTableProps = {
  onViewDetails: (transaction: any) => void;
};

const TransactionTable = ({ onViewDetails }: TTransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-600 border-yellow-300";
      case "rejected": return "bg-red-100 text-red-600 border-red-300";
      case "paid": return "bg-green-100 text-green-600 border-green-300";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
           </tr>
        </thead>
        <tbody>
          {transactionData.map((data) => (
            <tr key={data.id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-6 py-4">{data.date}</td>
              <td className="px-6 py-4">{data.customer}</td>
              <td className="px-6 py-4">{data.contact}</td>
              <td className="px-6 py-4">{priceFormatter(data.total)}</td>
              <td className="px-6 py-4">
                <div className={`px-4 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}`}>
                  {data.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => onViewDetails(data)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md">
                  <FiEye size={18} />
                  View Details
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