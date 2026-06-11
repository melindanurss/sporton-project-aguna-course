"use client";

import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const initialProductData = [
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

const ProductTable = ({ onProductsUpdate }: { onProductsUpdate?: (products: any[]) => void }) => {
  const [products, setProducts] = useState(initialProductData);

  const updateProducts = (newProducts: any[]) => {
    setProducts(newProducts);
    if (onProductsUpdate) {
      onProductsUpdate(newProducts);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateProducts(products.filter((product) => product.id !== id));
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${name}" has been deleted.`,
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#22c55e",
      });
    }
  };

  const handleEdit = (product: any) => {
    Swal.fire({
      title: 'Edit Product',
      html: `
        <div class="text-left" style="padding: 0 1rem;">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Product Name</label>
            <input id="swal-product-name" class="swal2-input" value="${product.name}" placeholder="Product Name" style="width: 100%; margin: 0;">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Category</label>
            <input id="swal-category" class="swal2-input" value="${product.category}" placeholder="Category" style="width: 100%; margin: 0;">
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Price (IDR)</label>
              <input id="swal-price" type="number" class="swal2-input" value="${product.price}" placeholder="Price" style="width: 100%; margin: 0;">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Stock</label>
              <input id="swal-stock" type="number" class="swal2-input" value="${product.stock}" placeholder="Stock" style="width: 100%; margin: 0;">
            </div>
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
        const name = (document.getElementById("swal-product-name") as HTMLInputElement).value;
        const category = (document.getElementById("swal-category") as HTMLInputElement).value;
        const price = parseInt((document.getElementById("swal-price") as HTMLInputElement).value);
        const stock = parseInt((document.getElementById("swal-stock") as HTMLInputElement).value);
        
        if (!name || !category || !price || !stock) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }
        
        return { name, category, price, stock };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = products.map((p) =>
          p.id === product.id
            ? { ...p, name: result.value.name, category: result.value.category, price: result.value.price, stock: result.value.stock }
            : p
        );
        updateProducts(updatedProducts);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `"${result.value.name}" has been updated.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
      }
    });
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
                  {
                    onClick: () => handleEdit(data),
                    className: "p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors",
                    title: "Edit Product"
                  },
                  React.createElement(FiEdit2, { size: 18 })
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => handleDelete(data.id, data.name),
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
    )
  );
};

export default ProductTable;