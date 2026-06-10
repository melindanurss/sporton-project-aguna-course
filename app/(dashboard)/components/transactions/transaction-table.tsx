"use client";

import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";
import React from "react";

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
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-300 font-semibold";
      case "rejected": return "bg-red-100 text-red-700 border-red-300 font-semibold";
      case "paid": return "bg-green-100 text-green-700 border-green-300 font-semibold";
      default: return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return React.createElement(
    "div",
    { className: "bg-white rounded-xl border border-gray-200 overflow-hidden" },
    React.createElement(
      "table",
      { className: "w-full text-left border-collapse" },
      React.createElement(
        "thead",
        { className: "bg-gray-50" },
        React.createElement(
          "tr",
          { className: "border-b border-gray-200" },
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Date"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Customer"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Contact"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Total"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Status"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Actions")
        )
      ),
      React.createElement(
        "tbody",
        null,
        transactionData.map((data) =>
          React.createElement(
            "tr",
            { key: data.id, className: "border-b border-gray-100 hover:bg-gray-50 transition-colors" },
            React.createElement("td", { className: "px-6 py-4 text-gray-700" }, data.date),
            React.createElement("td", { className: "px-6 py-4 font-medium text-gray-800" }, data.customer),
            React.createElement("td", { className: "px-6 py-4 text-gray-700" }, data.contact),
            React.createElement("td", { className: "px-6 py-4 font-medium text-gray-800" }, priceFormatter(data.total)),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement(
                "span",
                { className: `px-4 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}` },
                data.status
              )
            ),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement(
                "button",
                {
                  onClick: () => onViewDetails(data),
                  className: "flex items-center gap-2 p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                },
                React.createElement(FiEye, { size: 18 }),
                React.createElement("span", { className: "text-sm font-medium" }, "View Details")
              )
            )
          )
        )
      )
    )
  );
};

export default TransactionTable;