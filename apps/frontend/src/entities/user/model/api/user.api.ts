import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";

import type { Group, SshKey, SystemUser } from "../types";

export const userApi = {
  getAll: () => apiClient.get<SystemUser[]>("/users"),
  getGroups: () => apiClient.get<Group[]>("/users/groups"),
  create: (data: Partial<SystemUser> & { password: string }) =>
    apiClient.post<SystemUser>("/users", data),
  update: (username: string, data: Partial<SystemUser>) =>
    apiClient.patch<SystemUser>(`/users/${username}`, data),
  delete: (username: string, deleteHome?: boolean) =>
    apiClient.delete<void>(`/users/${username}?deleteHome=${deleteHome ?? false}`),
  resetPassword: (username: string, password: string) =>
    apiClient.post<void>(`/users/${username}/password`, { password }),
  lock: (username: string) => apiClient.post<void>(`/users/${username}/lock`),
  unlock: (username: string) => apiClient.post<void>(`/users/${username}/unlock`),
  getSshKeys: (username: string) => apiClient.get<SshKey[]>(`/users/${username}/ssh-keys`),
  addSshKey: (username: string, publicKey: string) =>
    apiClient.post<SshKey>(`/users/${username}/ssh-keys`, { publicKey }),
  removeSshKey: (username: string, keyId: string) =>
    apiClient.delete<void>(`/users/${username}/ssh-keys/${keyId}`),
};

// --- Mutations ---
export const useCreateUser = () =>
  useMutation({
    mutationFn: (data: Partial<SystemUser> & { password: string }) => userApi.create(data),
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: ({ username, data }: { username: string; data: Partial<SystemUser> }) =>
      userApi.update(username, data),
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: ({ username, deleteHome }: { username: string; deleteHome?: boolean }) =>
      userApi.delete(username, deleteHome),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      userApi.resetPassword(username, password),
  });

export const useLockUser = () =>
  useMutation({ mutationFn: (username: string) => userApi.lock(username) });

export const useUnlockUser = () =>
  useMutation({ mutationFn: (username: string) => userApi.unlock(username) });

export const useAddSshKey = () =>
  useMutation({
    mutationFn: ({ username, publicKey }: { username: string; publicKey: string }) =>
      userApi.addSshKey(username, publicKey),
  });

export const useRemoveSshKey = () =>
  useMutation({
    mutationFn: ({ username, keyId }: { username: string; keyId: string }) =>
      userApi.removeSshKey(username, keyId),
  });
