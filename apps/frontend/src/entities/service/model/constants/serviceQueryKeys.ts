export const serviceQueryKeys = {
  all: ["services"] as const,
  list: () => [...serviceQueryKeys.all, "list"] as const,
  timers: () => [...serviceQueryKeys.all, "timers"] as const,
  sockets: () => [...serviceQueryKeys.all, "sockets"] as const,
  logs: (name: string, lines?: number) => [...serviceQueryKeys.all, "logs", name, lines] as const,
};
