import { apiClient } from "@/shared/lib";

import type { SystemInfo, SystemMetrics } from "../types";

export const systemApi = {
  getInfo: () => apiClient.get<SystemInfo>("/system/info"),
  getMetrics: () => apiClient.get<SystemMetrics>("/system/metrics"),
};
