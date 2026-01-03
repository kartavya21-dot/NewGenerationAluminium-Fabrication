const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://ngaf-backend.onrender.com";

/* ------------------ Helpers ------------------ */

async function request(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}

/* ------------------ Categories ------------------ */

export function fetchCategories() {
  return request("/categories/");
}

/* ------------------ Products ------------------ */

export function fetchProducts() {
  return request("/products/");
}

export function fetchProductById(productId) {
  return request(`/products/${productId}`);
}

export function fetchProductsByCategory(categoryId) {
  return request(`/products/?category_id=${categoryId}`);
}
