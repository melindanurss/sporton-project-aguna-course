export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (!path || path === "") {
    return "/images/placeholder-category.png";
  }
  if (path.startsWith("http")) return path;
  if (path.startsWith("/images/")) return path;
  if (path.startsWith("category-")) return `/images/${path}`;
  if (path.startsWith("uploads/")) {
    return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
  }
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}

export function getAuthHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    Authorization: `Bearer ${token}`,
  };
}