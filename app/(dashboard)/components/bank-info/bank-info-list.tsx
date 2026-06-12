"use client";

import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllBanks, deleteBank } from "@/app/services/bank.service";
import { Bank } from "@/app/types";

const BankInfoList = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanks = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBanks();
      setBanks(data);
    } catch (error) {
      console.error("Failed to fetch banks:", error);
      await Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: "Could not load bank accounts.",
        confirmButtonColor: "#ff5f3f",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleDelete = async (id: string, bankName: string) => {
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
      try {
        await deleteBank(id);
        await fetchBanks();
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `"${bankName}" bank account has been deleted.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: "Could not delete bank account.",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const handleEdit = (bank: Bank) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { updateBank } = await import("@/app/services/bank.service");
          await updateBank(bank._id, result.value);
          await fetchBanks();
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `"${result.value.bankName}" bank account has been updated.`,
            timer: 1500,
            showConfirmButton: false,
            iconColor: "#22c55e",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Update Failed!",
            text: "Could not update bank account.",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-500">Loading bank accounts...</p>
      </div>
    );
  }

  if (banks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No bank accounts found. Click "Add Bank Account" to create one.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {banks.map((data) => (
        <div key={data._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
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
                onClick={() => handleDelete(data._id, data.bankName)}
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