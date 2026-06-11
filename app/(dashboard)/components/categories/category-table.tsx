"use client";

import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const initialCategoryData = [
  {
    id: 1,
    name: "Running",
    imageUrl: "/images/category-running.png",
    description: "All Running Items, Shoes, Shirts",
  },
  {
    id: 2,
    name: "Football",
    imageUrl: "/images/category-running.png",
    description: "All Football Items, Shoes, Jerseys",
  },
];

const CategoryTable = ({ onCategoriesUpdate }: { onCategoriesUpdate?: (categories: any[]) => void }) => {
  const [categories, setCategories] = useState(initialCategoryData);

  const updateCategories = (newCategories: any[]) => {
    setCategories(newCategories);
    if (onCategoriesUpdate) {
      onCategoriesUpdate(newCategories);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}" category. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateCategories(categories.filter((category) => category.id !== id));
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${name}" category has been deleted.`,
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#22c55e",
      });
    }
  };

  const handleEdit = (category: any) => {
    Swal.fire({
      title: "Edit Category",
      html: `
        <div class="text-left" style="padding: 0 1rem;">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Category Name</label>
            <input id="swal-category-name" class="swal2-input" value="${category.name}" placeholder="Category Name" style="width: 100%; margin: 0;">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 text-left mb-1">Description</label>
            <textarea id="swal-description" class="swal2-textarea" rows="3" placeholder="Category Description" style="width: 100%; margin: 0; padding: 8px 12px; border-radius: 8px; border: 1px solid #d1d5db;">${category.description}</textarea>
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
        const name = (document.getElementById("swal-category-name") as HTMLInputElement).value;
        const description = (document.getElementById("swal-description") as HTMLTextAreaElement).value;
        
        if (!name || !description) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }
        
        return { name, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCategories = categories.map((c) =>
          c.id === category.id
            ? { ...c, name: result.value.name, description: result.value.description }
            : c
        );
        updateCategories(updatedCategories);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `"${result.value.name}" category has been updated.`,
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
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Category Name"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Description"),
          React.createElement("th", { className: "px-6 py-4 font-semibold text-gray-800 text-sm" }, "Actions")
        )
      ),
      React.createElement(
        "tbody",
        null,
        categories.map((data) =>
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
            React.createElement("td", { className: "px-6 py-4 font-medium text-gray-800" }, data.description),
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
                    title: "Edit Category"
                  },
                  React.createElement(FiEdit2, { size: 18 })
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => handleDelete(data.id, data.name),
                    className: "p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
                    title: "Delete Category"
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

export default CategoryTable;