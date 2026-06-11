import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  return await fetchAPI<Product[]>("/products");
};

export const getProductDetail = async (id: string): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`);
};

export const createProduct = async (data: FormData): Promise<Product> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }

  return response.json();
};

export const updateProduct = async (
  id: string,
  data: FormData,
): Promise<Product> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update product");
  }

  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
};