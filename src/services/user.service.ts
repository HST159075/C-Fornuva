import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  createdAt: string;
  isActive?: boolean;
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    const list = response.data?.users;
    return Array.isArray(list) ? list : [];
  },

  updateUserRole: async (id: string, role: string) => {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data;
  },

  updateUserStatus: async (id: string, isActive: boolean) => {
    const response = await api.put(`/users/${id}/status`, { isActive });
    return response.data;
  },
};
