"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";
import Swal from "sweetalert2";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded?: (category: any) => void;
};

const CategoryModal = ({ isOpen, onClose, onCategoryAdded }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setCategoryName("");
    setDescription("");
  };

  const handleCreateCategory = async () => {
    if (!categoryName || !description) {
      await Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    if (!imageFile) {
      await Swal.fire({
        icon: "error",
        title: "Missing Image",
        text: "Please upload a category image",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    setIsLoading(true);

    const newId = Date.now();
    const newCategory = {
      id: newId,
      name: categoryName,
      imageUrl: imagePreview,
      description: description,
    };

    setTimeout(async () => {
      if (onCategoryAdded) {
        onCategoryAdded(newCategory);
      }
      
      await Swal.fire({
        icon: "success",
        title: "Category Created!",
        text: `"${categoryName}" category has been added successfully.`,
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#22c55e",
      });
      
      resetForm();
      onClose();
      setIsLoading(false);
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
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
          <Button
            variant="ghost"
            className="rounded-lg px-6 py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="rounded-lg px-6 py-2"
            onClick={handleCreateCategory}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;