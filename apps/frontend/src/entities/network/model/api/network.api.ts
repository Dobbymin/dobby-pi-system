import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/shared/lib";
import type { NetworkInterface } from "@/shared/types";

import type { FirewallRule, NetworkConnection } from "../types";

export const networkApi = {
  getInterfaces: () => apiClient.get<NetworkInterface[]>("/network/interfaces"),
  getFirewallRules: () => apiClient.get<FirewallRule[]>("/network/firewall/rules"),
  addFirewallRule: (rule: Omit<FirewallRule, "id">) =>
    apiClient.post<FirewallRule>("/network/firewall/rules", rule),
  updateFirewallRule: (id: string, data: Partial<FirewallRule>) =>
    apiClient.patch<FirewallRule>(`/network/firewall/rules/${id}`, data),
  deleteFirewallRule: (id: string) => apiClient.delete<void>(`/network/firewall/rules/${id}`),
  getConnections: () => apiClient.get<NetworkConnection[]>("/network/connections"),
};

// --- Mutations ---
export const useAddFirewallRule = () =>
  useMutation({ mutationFn: (rule: Omit<FirewallRule, "id">) => networkApi.addFirewallRule(rule) });

export const useUpdateFirewallRule = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FirewallRule> }) =>
      networkApi.updateFirewallRule(id, data),
  });

export const useDeleteFirewallRule = () =>
  useMutation({ mutationFn: (id: string) => networkApi.deleteFirewallRule(id) });
