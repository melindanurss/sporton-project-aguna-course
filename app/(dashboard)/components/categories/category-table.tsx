"use client";

import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import Swal from "sweetalert2";
import { deleteCategory } from "@/app/services/category.service";

type TCategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onCategoriesUpdate: (categories: Category[]) => void;
};

const CategoryTable = ({ categories, onEdit, onCategoriesUpdate }: TCategoryTableProps) => {
  const handleDelete = async (id: string, name: string) => {
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
      try {
        await deleteCategory(id);
        const updatedCategories = categories.filter((cat) => cat._id !== id);
        onCategoriesUpdate(updatedCategories);
        Swal.fire({ 
          icon: "success", 
          title: "Deleted!", 
          text: `"${name}" category has been deleted.`, 
          timer: 1500, 
          showConfirmButton: false, 
          iconColor: "#22c55e" 
        });
      } catch (error) {
        Swal.fire({ 
          icon: "error", 
          title: "Delete Failed", 
          text: "Could not delete category. Please try again.", 
          confirmButtonColor: "#ef4444" 
        });
      }
    }
  };

  const handleEditClick = (category: Category) => {
    console.log("Edit clicked for category:", category);
    onEdit(category);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Category Name</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Description</th>
            <th className="px-6 py-4 font-semibold text-gray-800 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image 
                      src={getImageUrl(category.imageUrl)} 
                      width={40} 
                      height={40} 
                      alt={category.name} 
                      className="object-cover" 
                    />
                  </div>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-800">{category.description}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleEditClick(category)} 
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                    title="Edit Category"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(category._id, category.name)} 
                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Delete Category"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;