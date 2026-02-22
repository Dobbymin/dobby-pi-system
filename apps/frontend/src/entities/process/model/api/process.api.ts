import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";

import type { Process } from "../types";

export const processApi = {
  getAll: () => apiClient.get<Process[]>("/processes"),
  kill: (pid: number) => apiClient.delete<void>(`/processes/${pid}`),
};

// --- Mutations ---
export const useKillProcess = () =>
  useMutation({ mutationFn: (pid: number) => processApi.kill(pid) });
