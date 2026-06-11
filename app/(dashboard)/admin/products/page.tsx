"use client";

import Button from "@/app/(website)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleProductAdded = (newProduct: any) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl text-gray-800">Product Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your inventory, prices, and stock.</p>
        </div>
        <Button variant="primary" className="rounded-lg flex items-center gap-2" onClick={() => setIsOpen(true)}>
          <FiPlus size={20} />
          Add Product
        </Button>
      </div>
      <ProductTable onProductsUpdate={setProducts} />
      <ProductModal isOpen={isOpen} onClose={handleCloseModal} onProductAdded={handleProductAdded} />
    </div>
  );
};

export default ProductManagement;