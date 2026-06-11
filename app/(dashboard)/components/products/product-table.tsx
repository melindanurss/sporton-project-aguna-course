"use client";

import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import React from "react";

type TProductTableProps = {
  products: any[];
  onDelete: (id: string, name: string) => void;
  onEdit: (product: any) => void;
};

const ProductTable = ({ products, onDelete, onEdit }: TProductTableProps) => {
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
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Product"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Category"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Price"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Stock"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Actions")
        )
      ),
      React.createElement(
        "tbody",
        null,
        products.map((data) =>
          React.createElement(
            "tr",
            { key: data._id, className: "border-b border-gray-100 hover:bg-gray-50 transition-colors" },
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement(
                "div",
                { className: "flex gap-3 items-center" },
                React.createElement(
                  "div",
                  { className: "w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden" },
                  React.createElement(Image, { src: getImageUrl(data.imageUrl), width: 40, height: 40, alt: data.name, className: "object-cover" })
                ),
                React.createElement("span", { className: "font-medium text-gray-800" }, data.name)
              )
            ),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement("span", { className: "px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-600" }, data.category?.name || data.category)
            ),
            React.createElement("td", { className: "px-6 py-4 font-medium text-gray-800" }, priceFormatter(data.price)),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement("span", { className: "px-2 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold" }, `${data.stock} units`)
            ),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement(
                "div",
                { className: "flex items-center gap-3" },
                React.createElement(
                  "button",
                  {
                    onClick: () => onEdit(data),
                    className: "p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors",
                    title: "Edit Product"
                  },
                  React.createElement(FiEdit2, { size: 18 })
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => onDelete(data._id, data.name),
                    className: "p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
                    title: "Delete Product"
                  },
                  React.createElement(FiTrash2, { size: 18 })
                )
              )
            )
          )
        )
      )
    ),
    products.length === 0 &&
      React.createElement(
        "div",
        { className: "text-center py-8 text-gray-500" },
        "No products found. Click \"Add Product\" to create one."
      )
  );
};

export default ProductTable;