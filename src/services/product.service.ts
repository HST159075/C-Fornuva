import api from "./api";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  categoryId: string;
  category?: Category;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  pageNum: number;
  limitNum: number;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  categoryId: string;
  sku: string;
  stock: number;
  brand?: string;
  images?: string[];
  material?: string[];
  colors?: string[];
  tags?: string[];
  isFeatured?: boolean;
}

export const productService = {
  getProducts: async (params: Record<string, string | number | boolean | undefined>): Promise<ProductsResponse> => {
    const response = await api.get("/products", { params });
    const data = response.data;
    const products = Array.isArray(data?.products) ? data.products : [];
    return {
      products,
      total: Number(data?.total ?? products.length),
      pageNum: Number(data?.pageNum ?? 1),
      limitNum: Number(data?.limitNum ?? 12),
    };
  },

  createProduct: async (payload: CreateProductPayload): Promise<Product> => {
    const response = await api.post("/products", payload);
    return response.data.product;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.product;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products/featured");
    return response.data.products;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data.categories || [];
  },
};
