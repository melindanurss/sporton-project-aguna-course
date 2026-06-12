"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/app/lib/api";
import { getProductDetail } from "@/app/services/product.service";
import { updateTransactionStatus } from "@/app/services/transaction.service";
import Swal from "sweetalert2";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
  onStatusUpdate?: () => void;
};

type ProductDetail = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
};

const TransactionModal = ({ isOpen, onClose, transaction, onStatusUpdate }: TTransactionModalProps) => {
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!transaction?.purchasedItems) return;
      
      setIsLoading(true);
      try {
        const purchasedItems = Array.isArray(transaction.purchasedItems) 
          ? transaction.purchasedItems 
          : [transaction.purchasedItems];
        
        const details = await Promise.all(
          purchasedItems.map(async (item: any) => {
            try {
              const product = await getProductDetail(item.productId);
              return {
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: item.qty,
              };
            } catch (error) {
              console.error(`Failed to fetch product ${item.productId}:`, error);
              return {
                _id: item.productId,
                name: "Product Not Found",
                price: 0,
                imageUrl: "",
                qty: item.qty,
              };
            }
          })
        );
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && transaction) {
      fetchProductDetails();
    }
  }, [isOpen, transaction]);

  const totalPrice = productDetails.reduce(
    (sum, item) => sum + (item.price * item.qty), 
    0
  );

  const handleApprove = async () => {
    if (!transaction?._id) return;
    
    const result = await Swal.fire({
      title: "Approve Transaction?",
      text: `You are about to approve transaction from ${transaction.customerName}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsActionLoading(true);
      try {
        await updateTransactionStatus(transaction._id, "paid");
        await Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Transaction has been approved successfully.",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
        onStatusUpdate?.();
        onClose();
      } catch (error: any) {
        await Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: error.message || "Could not approve transaction.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const handleReject = async () => {
    if (!transaction?._id) return;
    
    const result = await Swal.fire({
      title: "Reject Transaction?",
      text: `You are about to reject transaction from ${transaction.customerName}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsActionLoading(true);
      try {
        await updateTransactionStatus(transaction._id, "rejected");
        await Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Transaction has been rejected.",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#ef4444",
        });
        onStatusUpdate?.();
        onClose();
      } catch (error: any) {
        await Swal.fire({
          icon: "error",
          title: "Rejection Failed",
          text: error.message || "Could not reject transaction.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const getPaymentProofUrl = () => {
    if (!transaction?.paymentProof) return "/images/logo-admin.svg";
    return getImageUrl(transaction.paymentProof);
  };

  const isPending = transaction?.status === "pending";
  const isPaid = transaction?.status === "paid";
  const isRejected = transaction?.status === "rejected";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <h4 className="font-bold text-sm text-gray-800 mb-2">Payment Proof</h4>
          <div className="bg-gray-100 rounded-lg p-2 flex justify-center">
            <Image
              src={getPaymentProofUrl()}
              alt="payment proof"
              width={200}
              height={300}
              className="rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo-admin.svg";
              }}
            />
          </div>
          {isPaid && (
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <FiCheck size={14} /> Verified
              </span>
            </div>
          )}
          {isRejected && (
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                <FiX size={14} /> Rejected
              </span>
            </div>
          )}
        </div>
        
        <div className="md:w-3/5">
          <h4 className="font-bold text-sm text-gray-800 mb-2">Order Details</h4>
          <div className="bg-gray-50 rounded-lg p-4 text-sm mb-5 space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium text-gray-800">{transaction?._id?.slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">
                {transaction?.createdAt && new Date(transaction.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium text-gray-800">{transaction?.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Contact</span>
              <span className="font-medium text-gray-800">{transaction?.customerContact || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping Address</span>
              <span className="font-medium text-gray-800 text-right max-w-[250px]">{transaction?.customerAddress}</span>
            </div>
          </div>

          <h4 className="font-bold text-sm text-gray-800 mb-2">Items Purchased</h4>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 mb-4 max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading products...</div>
            ) : (
              productDetails.map((item) => (
                <div key={item._id} className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={getImageUrl(item.imageUrl)}
                      width={36}
                      height={36}
                      alt={item.name}
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/logo-admin.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">{priceFormatter(item.price)}</div>
                  </div>
                  <div className="text-sm text-gray-600">{item.qty} units</div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <h4 className="font-bold text-sm text-gray-800">Total</h4>
            <div className="text-primary font-bold text-lg">
              {priceFormatter(parseInt(transaction?.totalPayment || totalPrice.toString()))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            {isPending && (
              <>
                <Button
                  variant="danger"
                  size="small"
                  className="rounded-lg px-4 py-2"
                  onClick={handleReject}
                  disabled={isActionLoading}
                >
                  <FiX size={16} className="mr-1" />
                  {isActionLoading ? "Processing..." : "Reject"}
                </Button>
                <Button
                  variant="success"
                  size="small"
                  className="rounded-lg px-4 py-2"
                  onClick={handleApprove}
                  disabled={isActionLoading}
                >
                  <FiCheck size={16} className="mr-1" />
                  {isActionLoading ? "Processing..." : "Approve"}
                </Button>
              </>
            )}
            {!isPending && (
              <div className="text-sm text-gray-500 italic">
                {isPaid ? "✓ Transaction already approved" : "✗ Transaction already rejected"}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;