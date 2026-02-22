export const systemQueryKeys = {
  all: ["system"] as const,
  info: () => [...systemQueryKeys.all, "info"] as const,
  metrics: () => [...systemQueryKeys.all, "metrics"] as const,
};
