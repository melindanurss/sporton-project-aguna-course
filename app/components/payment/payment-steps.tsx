"use client";

import { FiCheckCircle } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const PaymentSteps = () => {
  const { push } = useRouter();
  const totalAmount = 1035000; // 458000*2 + 119000

  const uploadAndConfirm = () => {
    push("/order-status");
  };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal pl-5 space-y-4 text-sm">
          <li>
            Transfer the total amount of <b>{priceFormatter(totalAmount)}</b> to your preferred
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
          <FileUpload />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold mb-4">
          <div className="text-sm">Total</div>
          <div className="text-primary font-bold">
            {priceFormatter(totalAmount)}
          </div>
        </div>
        <Button
          variant="dark"
          className="w-full"
          onClick={uploadAndConfirm}
        >
          <FiCheckCircle />
          Upload Receipt & Confirm
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;