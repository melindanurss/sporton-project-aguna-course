"use client";

import Button from "@/app/(website)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: any | null;
};

const ProductModal = ({ isOpen, onClose, onSuccess, product }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.description) {
      await Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    if (!imageFile && !isEditMode) {
      await Swal.fire({
        icon: "error",
        title: "Missing Image",
        text: "Please upload a product image",
        confirmButtonColor: "#ff5f3f",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, formDataToSend);
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `"${formData.name}" has been updated.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
      } else {
        await createProduct(formDataToSend);
        await Swal.fire({
          icon: "success",
          title: "Created!",
          text: `"${formData.name}" has been added successfully.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
      }

      resetForm();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      await Swal.fire({
        icon: "error",
        title: isEditMode ? "Update Failed!" : "Creation Failed!",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditMode && isOpen && product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category?._id || "",
        stock: product.stock?.toString() || "",
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isOpen) {
      resetForm();
    }
  }, [isOpen, product, isEditMode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add New Product"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6 items-stretch">
          <div className="w-48">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="h-full"
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="input-group-admin">
              <label htmlFor="name" className="text-sm font-bold text-gray-800">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running Shoes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="price" className="text-sm font-bold text-gray-800">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e. g. 500000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock" className="text-sm font-bold text-gray-800">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e. g. 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category" className="text-sm font-bold text-gray-800">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="input-group-admin">
          <label htmlFor="description" className="text-sm font-bold text-gray-800">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Details..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="ghost"
            className="rounded-lg px-6 py-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="rounded-lg px-6 py-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Product" : "Create Product")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;