import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Bank } from "../types";

export const getAllBanks = async (): Promise<Bank[]> => {
  return await fetchAPI<Bank[]>("/banks");
};

export const createBank = async (data: {
  bankName: string;
  accountNumber: string;
  accountName: string;
}): Promise<Bank> => {
  return await fetchAPI<Bank>("/banks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
};

export const updateBank = async (
  id: string,
  data: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }
): Promise<Bank> => {
  return await fetchAPI<Bank>(`/banks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
};

export const deleteBank = async (id: string): Promise<void> => {
  return await fetchAPI<void>(`/banks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
};