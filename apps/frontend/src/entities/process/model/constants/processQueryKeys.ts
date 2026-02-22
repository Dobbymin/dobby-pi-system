export const processQueryKeys = {
  all: ["processes"] as const,
  list: () => [...processQueryKeys.all, "list"] as const,
};
