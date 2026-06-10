"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductModal = ({ isOpen, onClose }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-stretch">
          <div className="w-48">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={handleImageChange}
              className="h-full"
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="input-group-admin">
              <label htmlFor="productName" className="text-sm font-bold text-gray-800">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="e. g. Running Shoes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="productPrice" className="text-sm font-bold text-gray-800">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="e. g. 500000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock" className="text-sm font-bold text-gray-800">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="e. g. 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category" className="text-sm font-bold text-gray-800">Category</label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
              >
                <option value="" disabled selected>Select Category</option>
                <option value="running">Running</option>
                <option value="football">Football</option>
                <option value="tennis">Tennis</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="input-group-admin">
          <label htmlFor="description" className="text-sm font-bold text-gray-800">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            placeholder="Product Details..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          ></textarea>
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
            Create Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;