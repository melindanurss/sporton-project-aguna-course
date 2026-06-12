"use client";

import Button from "@/app/(website)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import Swal from "sweetalert2";

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to Load", text: "Could not load categories.", confirmButtonColor: "#ff5f3f" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories.</p>
        </div>
        <Button variant="primary" className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} /> Add Category
        </Button>
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Loading categories...</p>
        </div>
      ) : (
        <CategoryTable 
          categories={categories} 
          onEdit={handleEdit} 
          onCategoriesUpdate={setCategories} 
        />
      )}
      
      <CategoryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={fetchCategories}
        category={selectedCategory}
        existingCategories={categories}
      />
    </div>
  );
};

export default CategoryManagement;