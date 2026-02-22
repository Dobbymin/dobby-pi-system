import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";

import type {
  DockerContainer,
  DockerImage,
  DockerInfo,
  DockerNetwork,
  DockerVolume,
} from "../types";

export const dockerApi = {
  getInfo: () => apiClient.get<DockerInfo>("/docker/info"),
  // Containers
  getContainers: () => apiClient.get<DockerContainer[]>("/docker/containers"),
  startContainer: (id: string) => apiClient.post<void>(`/docker/containers/${id}/start`),
  stopContainer: (id: string) => apiClient.post<void>(`/docker/containers/${id}/stop`),
  restartContainer: (id: string) => apiClient.post<void>(`/docker/containers/${id}/restart`),
  pauseContainer: (id: string) => apiClient.post<void>(`/docker/containers/${id}/pause`),
  unpauseContainer: (id: string) => apiClient.post<void>(`/docker/containers/${id}/unpause`),
  removeContainer: (id: string) => apiClient.delete<void>(`/docker/containers/${id}`),
  getContainerLogs: (id: string) => apiClient.get<string[]>(`/docker/containers/${id}/logs`),
  // Images
  getImages: () => apiClient.get<DockerImage[]>("/docker/images"),
  pullImage: (name: string) => apiClient.post<void>("/docker/images/pull", { name }),
  removeImage: (id: string) => apiClient.delete<void>(`/docker/images/${id}`),
  // Volumes
  getVolumes: () => apiClient.get<DockerVolume[]>("/docker/volumes"),
  createVolume: (name: string) => apiClient.post<DockerVolume>("/docker/volumes", { name }),
  removeVolume: (name: string) => apiClient.delete<void>(`/docker/volumes/${name}`),
  // Networks
  getNetworks: () => apiClient.get<DockerNetwork[]>("/docker/networks"),
  removeNetwork: (id: string) => apiClient.delete<void>(`/docker/networks/${id}`),
  // Prune
  prune: () => apiClient.post<void>("/docker/prune"),
};

// --- Mutations ---
export const useStartContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.startContainer(id) });

export const useStopContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.stopContainer(id) });

export const useRestartContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.restartContainer(id) });

export const usePauseContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.pauseContainer(id) });

export const useUnpauseContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.unpauseContainer(id) });

export const useRemoveContainer = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.removeContainer(id) });

export const usePullImage = () =>
  useMutation({ mutationFn: (name: string) => dockerApi.pullImage(name) });

export const useRemoveImage = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.removeImage(id) });

export const useCreateVolume = () =>
  useMutation({ mutationFn: (name: string) => dockerApi.createVolume(name) });

export const useRemoveVolume = () =>
  useMutation({ mutationFn: (name: string) => dockerApi.removeVolume(name) });

export const useRemoveDockerNetwork = () =>
  useMutation({ mutationFn: (id: string) => dockerApi.removeNetwork(id) });

export const usePruneDocker = () => useMutation({ mutationFn: dockerApi.prune });
