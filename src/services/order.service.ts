import api from "./api";

export interface OrderLineItem {
  id: string;
  productId: string;
  name: string;
  image?: string | null;
  price: number | string;
  quantity: number;
  product?: { id: string; name: string; images?: string[] };
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  total: number;
  totalPrice: number;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  status: OrderStatus;
  isPaid: boolean;
  paymentMethod: string;
  createdAt: string;
  orderItems: OrderLineItem[];
  items?: OrderLineItem[];
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  };
  shippingName?: string | null;
  shippingStreet?: string | null;
  shippingCity?: string | null;
  shippingState?: string | null;
  shippingZip?: string | null;
  shippingCountry?: string | null;
  shippingPhone?: string | null;
  trackingNumber?: string | null;
  notes?: string | null;
}

function normalizeOrder(raw: Record<string, unknown>): Order {
  const lines = (raw.orderItems ?? raw.items ?? []) as OrderLineItem[];
  const rawTotal = raw.totalPrice ?? raw.total ?? 0;
  const n = Number(rawTotal);
  return {
    ...(raw as unknown as Order),
    orderItems: lines,
    items: lines,
    total: Number.isFinite(n) ? n : 0,
    totalPrice: Number.isFinite(n) ? n : 0,
  };
}

export function orderLineItems(order: Pick<Order, "orderItems" | "items">): OrderLineItem[] {
  return order.orderItems?.length ? order.orderItems : order.items ?? [];
}

export function orderTotalAmount(order: Pick<Order, "total" | "totalPrice">): number {
  const v = order.totalPrice ?? order.total ?? 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export const orderService = {
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get("/orders/my");
    const list = response.data?.orders;
    if (!Array.isArray(list)) return [];
    return list.map((o: Record<string, unknown>) => normalizeOrder(o));
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    const raw = response.data?.order as Record<string, unknown> | undefined;
    if (!raw) throw new Error("Order not found");
    return normalizeOrder(raw);
  },

  createOrder: async (orderData: { 
    items: { productId: string; quantity: number }[];
    paymentMethod: string;
    shippingAddress?: string;
  }) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get("/orders");
    return response.data.orders || [];
  },
};
