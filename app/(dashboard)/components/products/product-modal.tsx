"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";
import Swal from "sweetalert2";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: (product: any) => void;
};

const ProductModal = ({ isOpen, onClose, onProductAdded }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setProductName("");
    setPrice("");
    setStock("");
    setSelectedCategory("");
    setDescription("");
  };

  const handleCreateProduct = async () => {
    if (!productName || !price || !stock || !selectedCategory || !description) {
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
        text: "Please upload a product image",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    setIsLoading(true);

    const newId = Date.now();
    const newProduct = {
      id: newId,
      name: productName,
      imageUrl: imagePreview,
      category: selectedCategory,
      price: parseInt(price),
      stock: parseInt(stock),
      description: description,
    };

    setTimeout(async () => {
      if (onProductAdded) {
        onProductAdded(newProduct);
      }
      
      await Swal.fire({
        icon: "success",
        title: "Product Created!",
        text: `"${productName}" has been added successfully.`,
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
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
                <option value="" disabled>Select Category</option>
                <option value="Running">Running</option>
                <option value="Football">Football</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleCreateProduct}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;