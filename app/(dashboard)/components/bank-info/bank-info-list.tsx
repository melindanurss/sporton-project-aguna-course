"use client";

import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Swal from "sweetalert2";

const initialBankData = [
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

const BankInfoList = ({ onBanksUpdate }: { onBanksUpdate?: (banks: any[]) => void }) => {
  const [banks, setBanks] = useState(initialBankData);

  const updateBanks = (newBanks: any[]) => {
    setBanks(newBanks);
    if (onBanksUpdate) {
      onBanksUpdate(newBanks);
    }
  };

  const handleDelete = async (id: number, bankName: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${bankName}" bank account. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateBanks(banks.filter((bank) => bank.id !== id));
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${bankName}" bank account has been deleted.`,
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#22c55e",
      });
    }
  };

  const handleEdit = (bank: any) => {
    Swal.fire({
      title: "Edit Bank Account",
      html: `
        <div class="text-left" style="padding: 0 1rem;">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Bank Name</label>
            <input id="swal-bank-name" class="swal2-input" value="${bank.bankName}" placeholder="e.g. BCA, Mandiri, BRI" style="width: 100%; margin: 0;">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Account Number</label>
            <input id="swal-account-number" class="swal2-input" value="${bank.accountNumber}" placeholder="Account Number" style="width: 100%; margin: 0;">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Account Holder</label>
            <input id="swal-account-name" class="swal2-input" value="${bank.accountName}" placeholder="Account Holder Name" style="width: 100%; margin: 0;">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#ff5f3f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      width: "600px",
      padding: "1.5rem",
      customClass: {
        popup: "rounded-xl",
        input: "rounded-lg border-gray-300 focus:border-primary focus:ring-primary",
      },
      preConfirm: () => {
        const bankName = (document.getElementById("swal-bank-name") as HTMLInputElement).value;
        const accountNumber = (document.getElementById("swal-account-number") as HTMLInputElement).value;
        const accountName = (document.getElementById("swal-account-name") as HTMLInputElement).value;
        
        if (!bankName || !accountNumber || !accountName) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }
        
        return { bankName, accountNumber, accountName };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBanks = banks.map((b) =>
          b.id === bank.id
            ? { ...b, bankName: result.value.bankName, accountNumber: result.value.accountNumber, accountName: result.value.accountName }
            : b
        );
        updateBanks(updatedBanks);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `"${result.value.bankName}" bank account has been updated.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      {banks.map((data) => (
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
              <button
                onClick={() => handleEdit(data)}
                className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Bank Account"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(data.id, data.bankName)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Bank Account"
              >
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