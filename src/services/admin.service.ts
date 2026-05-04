import api from "./api";
import { Product } from "./product.service";
import { Order } from "./order.service";

export interface DashboardStats {
  overview: {
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    totalReviews: number;
    totalRevenue: number;
    pendingOrders: number;
    thisMonthOrders: number;
    lastMonthOrders: number;
    thisMonthRevenue: number;
    lastMonthRevenue: number;
  };
  monthlyRevenue: {
    label: string;
    revenue: number;
    orders: number;
  }[];
  ordersByStatus: {
    status: string;
    count: number;
  }[];
  topProducts: (Product & { sales: number })[];
  recentOrders: Order[];
  lowStockProducts: Product[];
}

export const adminService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
};
