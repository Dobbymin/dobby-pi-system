import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";

import type { Service, Socket, Timer } from "../types";

export const serviceApi = {
  getAll: () => apiClient.get<Service[]>("/services"),
  getTimers: () => apiClient.get<Timer[]>("/services/timers"),
  getSockets: () => apiClient.get<Socket[]>("/services/sockets"),
  start: (name: string) => apiClient.post<void>(`/services/${name}/start`),
  stop: (name: string) => apiClient.post<void>(`/services/${name}/stop`),
  restart: (name: string) => apiClient.post<void>(`/services/${name}/restart`),
  enable: (name: string) => apiClient.post<void>(`/services/${name}/enable`),
  disable: (name: string) => apiClient.post<void>(`/services/${name}/disable`),
  getLogs: (name: string, lines?: number) =>
    apiClient.get<string[]>(`/services/${name}/logs?lines=${lines ?? 100}`),
};

// --- Mutations ---
export const useStartService = () =>
  useMutation({ mutationFn: (name: string) => serviceApi.start(name) });

export const useStopService = () =>
  useMutation({ mutationFn: (name: string) => serviceApi.stop(name) });

export const useRestartService = () =>
  useMutation({ mutationFn: (name: string) => serviceApi.restart(name) });

export const useEnableService = () =>
  useMutation({ mutationFn: (name: string) => serviceApi.enable(name) });

export const useDisableService = () =>
  useMutation({ mutationFn: (name: string) => serviceApi.disable(name) });
