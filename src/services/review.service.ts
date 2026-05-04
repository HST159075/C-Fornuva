import api from "./api";

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export const reviewService = {
  getReviewsByProduct: async (productId: string): Promise<Review[]> => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data.reviews || [];
  },

  createReview: async (data: { productId: string; rating: number; title?: string; comment: string }): Promise<Review> => {
    const response = await api.post("/reviews", data);
    return response.data.review;
  },

  deleteReview: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  },
};
