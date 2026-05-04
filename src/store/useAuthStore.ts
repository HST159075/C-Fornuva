import { create } from "zustand";
import { authService, User } from "../services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: Record<string, string>) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (data: Record<string, string>) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(data);
      set({ user: res.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      set({ isLoading: false, error: axiosError?.response?.data?.message || "Login failed" });
      throw error;
    }
  },

  register: async (data: Record<string, string>) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.register(data);
      set({ user: res.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      set({ isLoading: false, error: axiosError?.response?.data?.message || "Registration failed" });
      throw error;
    }
  },

  checkSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.getSession();
      if (data?.user) {
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
