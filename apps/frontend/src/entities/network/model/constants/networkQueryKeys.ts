export const networkQueryKeys = {
  all: ["network"] as const,
  interfaces: () => [...networkQueryKeys.all, "interfaces"] as const,
  firewallRules: () => [...networkQueryKeys.all, "firewall", "rules"] as const,
  connections: () => [...networkQueryKeys.all, "connections"] as const,
};
