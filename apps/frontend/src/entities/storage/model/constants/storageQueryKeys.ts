export const storageQueryKeys = {
  all: ["storage"] as const,
  partitions: () => [...storageQueryKeys.all, "partitions"] as const,
  smart: () => [...storageQueryKeys.all, "smart"] as const,
};
