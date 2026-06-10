"use client";

import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import React from "react";

const productData = [
  {
    id: 1,
    name: "SportOn FootFastball V1",
    imageUrl: "/images/SportOn FootFastball V1.png",
    category: "Running",
    price: 289000,
    stock: 3,
  },
  {
    id: 2,
    name: "SportOn HyperFast V2",
    imageUrl: "/images/SportOn HyperFast V2.png",
    category: "Running",
    price: 229000,
    stock: 5,
  },
  {
    id: 3,
    name: "SportOn FootFastball V3",
    imageUrl: "/images/SportOn FootFastball V3.png",
    category: "Running",
    price: 289000,
    stock: 3,
  },
  {
    id: 4,
    name: "SportOn HyperFast V4",
    imageUrl: "/images/SportOn HyperFast V4.png",
    category: "Running",
    price: 229000,
    stock: 5,
  },
];

const ProductTable = () => {
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
        productData.map((data) =>
          React.createElement(
            "tr",
            { key: data.id, className: "border-b border-gray-100 hover:bg-gray-50 transition-colors" },
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement(
                "div",
                { className: "flex gap-3 items-center" },
                React.createElement(
                  "div",
                  { className: "w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden" },
                  React.createElement(Image, { src: data.imageUrl, width: 40, height: 40, alt: data.name, className: "object-cover" })
                ),
                React.createElement("span", { className: "font-medium text-gray-800" }, data.name)
              )
            ),
            React.createElement(
              "td",
              { className: "px-6 py-4" },
              React.createElement("span", { className: "px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-600" }, data.category)
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
                  { className: "p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" },
                  React.createElement(FiEdit2, { size: 18 })
                ),
                React.createElement(
                  "button",
                  { className: "p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors" },
                  React.createElement(FiTrash2, { size: 18 })
                )
              )
            )
          )
        )
      )
    )
  );
};

export default ProductTable;