import { apiClient } from "@/shared/lib";

import type { SmartInfo, StoragePartition } from "../types";

export const storageApi = {
  getPartitions: () => apiClient.get<StoragePartition[]>("/storage/partitions"),
  getSmartInfo: () => apiClient.get<SmartInfo[]>("/storage/smart"),
};
