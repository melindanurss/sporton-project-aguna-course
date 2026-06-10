"use client";

import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";

const bankData = [
  {
    id: 1,
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "PT SportOn Digital",
  },
  {
    id: 2,
    bankName: "Mandiri",
    accountNumber: "9876543210123",
    accountName: "PT SportOn Digital",
  },
  {
    id: 3,
    bankName: "BRI",
    accountNumber: "456789123456",
    accountName: "PT SportOn Digital",
  },
];

const BankInfoList = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {bankData.map((data) => (
        <div key={data.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start p-5">
            <div className="flex gap-3 items-center">
              <div className="bg-blue-50 text-blue-600 rounded-lg w-10 h-10 flex justify-center items-center">
                <FiCreditCard size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{data.bankName}</div>
                <div className="text-xs text-gray-400">Bank Transfer</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                <FiEdit2 size={18} />
              </button>
              <button className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
          <div className="px-5 pb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider">ACCOUNT NUMBER</div>
            <div className="font-medium text-gray-800 mt-1">{data.accountNumber}</div>
          </div>
          <div className="border-t border-gray-100 px-5 py-3">
            <span className="text-xs text-gray-400">Holder :</span>
            <span className="text-xs font-semibold text-gray-800 ml-1">{data.accountName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankInfoList;