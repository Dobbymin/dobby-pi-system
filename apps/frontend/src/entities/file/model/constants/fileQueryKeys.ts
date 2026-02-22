export const fileQueryKeys = {
  all: ["files"] as const,
  list: (path: string) => [...fileQueryKeys.all, "list", path] as const,
  content: (path: string) => [...fileQueryKeys.all, "content", path] as const,
  search: (path: string, query: string) => [...fileQueryKeys.all, "search", path, query] as const,
};
