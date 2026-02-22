import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";

import type { FileEntry } from "../types";

export const fileApi = {
  list: (path: string) => apiClient.get<FileEntry[]>(`/files?path=${encodeURIComponent(path)}`),
  read: (path: string) => apiClient.get<string>(`/files/content?path=${encodeURIComponent(path)}`),
  write: (path: string, content: string) =>
    apiClient.put<void>("/files/content", { path, content }),
  create: (path: string, type: "file" | "directory") =>
    apiClient.post<void>("/files", { path, type }),
  delete: (path: string) => apiClient.delete<void>(`/files?path=${encodeURIComponent(path)}`),
  rename: (path: string, newName: string) =>
    apiClient.patch<void>("/files/rename", { path, newName }),
  copy: (source: string, destination: string) =>
    apiClient.post<void>("/files/copy", { source, destination }),
  move: (source: string, destination: string) =>
    apiClient.post<void>("/files/move", { source, destination }),
  search: (path: string, query: string) =>
    apiClient.get<FileEntry[]>(
      `/files/search?path=${encodeURIComponent(path)}&q=${encodeURIComponent(query)}`,
    ),
  getDownloadUrl: (path: string) => `/api/files/download?path=${encodeURIComponent(path)}`,
};

// --- Mutations ---
export const useWriteFile = () =>
  useMutation({
    mutationFn: ({ path, content }: { path: string; content: string }) =>
      fileApi.write(path, content),
  });

export const useCreateFile = () =>
  useMutation({
    mutationFn: ({ path, type }: { path: string; type: "file" | "directory" }) =>
      fileApi.create(path, type),
  });

export const useDeleteFile = () =>
  useMutation({ mutationFn: (path: string) => fileApi.delete(path) });

export const useRenameFile = () =>
  useMutation({
    mutationFn: ({ path, newName }: { path: string; newName: string }) =>
      fileApi.rename(path, newName),
  });

export const useCopyFile = () =>
  useMutation({
    mutationFn: ({ source, destination }: { source: string; destination: string }) =>
      fileApi.copy(source, destination),
  });

export const useMoveFile = () =>
  useMutation({
    mutationFn: ({ source, destination }: { source: string; destination: string }) =>
      fileApi.move(source, destination),
  });
