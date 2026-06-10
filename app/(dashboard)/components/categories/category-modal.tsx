"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoryModal = ({ isOpen, onClose }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
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
          >
            Create Category
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;