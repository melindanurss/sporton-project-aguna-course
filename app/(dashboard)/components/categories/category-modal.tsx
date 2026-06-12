"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import {
  createCategory,
  updateCategory,
} from "@/app/services/category.service";
import Swal from "sweetalert2";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category?: Category | null;
  existingCategories?: Category[];
};

const CategoryModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  category,
  existingCategories = [] 
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const isEditMode = !!category;

  useEffect(() => {
    console.log("Modal opened - isEditMode:", isEditMode, "category:", category);
    
    if (isEditMode && isOpen && category) {
      setCategoryName(category.name);
      setDescription(category.description);
      setImagePreview(category.imageUrl ? getImageUrl(category.imageUrl) : null);
      setImageFile(null);
    } else if (!isEditMode && isOpen) {
      setCategoryName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
    }
  }, [category, isOpen, isEditMode]);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      Swal.fire({ icon: "error", title: "Missing Field", text: "Please enter a category name", confirmButtonColor: "#ff5f3f" });
      return;
    }
    if (!description.trim()) {
      Swal.fire({ icon: "error", title: "Missing Field", text: "Please enter a description", confirmButtonColor: "#ff5f3f" });
      return;
    }
    
    const isDuplicate = existingCategories.some(
      (cat) => cat.name.toLowerCase() === categoryName.trim().toLowerCase() && cat._id !== category?._id
    );
    if (isDuplicate) {
      Swal.fire({ icon: "error", title: "Duplicate Name", text: `Category "${categoryName}" already exists.`, confirmButtonColor: "#ff5f3f" });
      return;
    }

    if (!isEditMode && !imageFile) {
      Swal.fire({ icon: "error", title: "Missing Image", text: "Please upload a category image", confirmButtonColor: "#ff5f3f" });
      return;
    }

    setIsLoading(true);
    
    try {
      const data = new FormData();
      data.append("name", categoryName.trim());
      data.append("description", description.trim());
      if (imageFile) data.append("image", imageFile);

      if (isEditMode && category) {
        await updateCategory(category._id, data);
        Swal.fire({ icon: "success", title: "Updated!", text: `"${categoryName}" category has been updated.`, timer: 1500, showConfirmButton: false, iconColor: "#22c55e" });
      } else {
        await createCategory(data);
        Swal.fire({ icon: "success", title: "Category Created!", text: `"${categoryName}" category has been added.`, timer: 1500, showConfirmButton: false, iconColor: "#22c55e" });
      }

      setCategoryName("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Category error:", error);
      Swal.fire({ 
        icon: "error", 
        title: isEditMode ? "Update Failed" : "Creation Failed", 
        text: error?.message || "Please try again", 
        confirmButtonColor: "#ef4444" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-stretch">
          <div className="w-48">
            <ImageUploadPreview
              label="Category Image"
              value={imagePreview}
              onChange={handleImageChange}
              className="h-full"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="input-group-admin">
              <label htmlFor="categoryName" className="text-sm font-bold text-gray-800">Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e. g. Running"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="description" className="text-sm font-bold text-gray-800">Description</label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category Details..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <Button variant="ghost" className="rounded-lg px-6 py-2" onClick={onClose}>Cancel</Button>
          <Button variant="primary" className="rounded-lg px-6 py-2" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Category" : "Create Category")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;