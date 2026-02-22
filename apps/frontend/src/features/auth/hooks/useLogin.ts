import { useMutation } from "@tanstack/react-query";

import { type LoginRequest, authApi } from "../apis/auth.api";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.data.accessToken);
    },
  });
}
