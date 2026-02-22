import { useMutation } from "@tanstack/react-query";

import { authApi } from "../apis/auth.api";

export function useLogout() {
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      localStorage.removeItem("access_token");
    },
  });
}
