import api from "./api";

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "USER" | "MANAGER" | "ADMIN";
}

export interface SessionData {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
  user: User;
}

export const authService = {
  // Login with Email
  login: async (data: Record<string, string>): Promise<SessionData> => {
    const response = await api.post("/auth/sign-in/email", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  // Register with Email
  register: async (data: Record<string, string>): Promise<SessionData> => {
    const response = await api.post("/auth/sign-up/email", {
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return response.data;
  },

  // Get current session
  getSession: async (): Promise<SessionData | null> => {
    try {
      const response = await api.get("/auth/get-session"); // Better Auth default is get-session
      return response.data;
    } catch {
      return null;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post("/auth/sign-out");
  },

  // Update Profile
  updateProfile: async (data: { name: string }): Promise<{ success: boolean; user: User }> => {
    const response = await api.put("/auth/extra/profile", data);
    return response.data;
  },

  // Update Address
  updateAddress: async (data: { address: string; city: string; zip: string }): Promise<{ success: boolean }> => {
    const response = await api.put("/auth/extra/address", data);
    return response.data;
  },
};
