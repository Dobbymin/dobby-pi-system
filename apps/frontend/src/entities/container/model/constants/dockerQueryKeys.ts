export const dockerQueryKeys = {
  all: ["docker"] as const,
  info: () => [...dockerQueryKeys.all, "info"] as const,
  containers: () => [...dockerQueryKeys.all, "containers"] as const,
  containerLogs: (id: string) => [...dockerQueryKeys.all, "containers", id, "logs"] as const,
  images: () => [...dockerQueryKeys.all, "images"] as const,
  volumes: () => [...dockerQueryKeys.all, "volumes"] as const,
  networks: () => [...dockerQueryKeys.all, "networks"] as const,
};
