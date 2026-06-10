import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import OrderRejected from "../../components/order-status/order-rejected";
import { getTransactionById } from "../../../services/transaction.service";

export type TPageProps = {
  params: Promise<{ id: string }>;
};

const OrderStatus = async ({ params }: TPageProps) => {
  const { id } = await params;

  let transaction;
  try {
    transaction = await getTransactionById(id);
    console.log("Transaction:", transaction);
  } catch (error) {
    console.error("Failed to fetch transaction:", error);
    return (
      <main className="bg-gray-100 min-h-[80vh]">
        <div className="max-w-5xl mx-auto py-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
          <div className="bg-white max-w-2xl mx-auto p-12 rounded-2xl shadow-lg text-center">
            <p className="text-red-500">Transaction not found or invalid ID.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        {transaction.status === "pending" && <OrderSubmitted />}
        {transaction.status === "paid" && <OrderConfirmed />}
        {transaction.status === "rejected" && <OrderRejected />}
      </div>
    </main>
  );
};

export default OrderStatus;