"use client";

import Button from "@/app/(website)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { getAllProducts, deleteProduct } from "@/app/services/product.service";
import Swal from "sweetalert2";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      await Swal.fire({
        icon: "error",
        title: "Failed to Load Products",
        text: error.message,
        confirmButtonColor: "#ff5f3f",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `"${name}" has been deleted.`,
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#22c55e",
        });
        fetchProducts();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: error.message,
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const handleSuccess = () => {
    fetchProducts();
    handleCloseModal();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
      <ProductTable products={products} onDelete={handleDelete} onEdit={handleEdit} />
      <ProductModal isOpen={isOpen} onClose={handleCloseModal} onSuccess={handleSuccess} product={editingProduct} />
    </div>
  );
};

export default ProductManagement;