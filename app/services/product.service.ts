import { fetchAPI } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await fetchAPI<Product[]>("/products");
  console.log("Products from API:", products);
  return products;
};

export const getProductDetail = async (id: string): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`);
};