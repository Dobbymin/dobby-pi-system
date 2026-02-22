import { apiClient } from "@/shared/lib";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  username: string;
  role: "admin" | "operator" | "viewer";
}

export const authApi = {
  login: (credentials: LoginRequest) => apiClient.post<AuthTokens>("/auth/login", credentials),
  logout: () => apiClient.post<void>("/auth/logout"),
  refresh: () => apiClient.post<AuthTokens>("/auth/refresh"),
  me: () => apiClient.get<AuthUser>("/auth/me"),
};
