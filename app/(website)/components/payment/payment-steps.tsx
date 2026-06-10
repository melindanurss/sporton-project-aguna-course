"use client";

import { FiCheckCircle } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { transactionCheckout } from "@/app/services/transaction.service";

const PaymentSteps = () => {
  const { push } = useRouter();
  const { items, customerInfo, reset } = useCartStore();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleConfirmPayment = async () => {
    if (!file) {
      alert("Please upload your payment receipt!");
      return;
    }

    if (!customerInfo) {
      alert("Customer information is missing, please return to checkout");
      push("/checkout");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("customerName", customerInfo.customerName);
      formData.append(
        "customerContact",
        customerInfo.customerContact!.toString()
      );
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append("image", file);
      
      // Filter items yang memiliki _id (productId)
      const validItems = items
        .filter(item => item._id)
        .map((item) => ({ productId: item._id, qty: item.qty }));
      
      console.log("Valid items being sent:", validItems);
      
      formData.append("purchasedItems", JSON.stringify(validItems));
      formData.append("totalPayment", totalPrice.toString());

      const res = await transactionCheckout(formData);

      alert("Transaction created successfully!");
      reset();
      push(`/order-status/${res._id}`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to confirm payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal pl-5 space-y-4 text-sm">
          <li>
            Transfer the total amount of <b>{priceFormatter(totalPrice)}</b> to your preferred
            bank account listed under 'Payment Options' (BCA, Mandiri, or BRI).
          </li>
          <li>
            After completing the transfer, <b>keep the payment receipt</b> or a
            screenshot of the transfer confirmation. This will be needed for the
            next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the{" "}
            <b>'Upload Receipt & Confirm'</b> button below to validate your
            transaction.
          </li>
        </ol>
        <div className="mt-5">
          <FileUpload onFileSelect={setFile} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold mb-4">
          <div className="text-sm">Total</div>
          <div className="text-primary font-bold">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button
          variant="dark"
          className="w-full"
          onClick={handleConfirmPayment}
          disabled={isLoading}
        >
          <FiCheckCircle />
          {isLoading ? "Processing..." : "Upload Receipt & Confirm"}
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;