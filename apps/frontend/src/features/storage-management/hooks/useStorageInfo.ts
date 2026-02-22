import { useQuery } from "@tanstack/react-query";

import { storageApi, storageQueryKeys } from "@/entities/storage";

export function useStorageInfo() {
  const { data: partData, isLoading: partLoading } = useQuery({
    queryKey: storageQueryKeys.partitions(),
    queryFn: storageApi.getPartitions,
    refetchInterval: 30_000,
  });

  const { data: smartData, isLoading: smartLoading } = useQuery({
    queryKey: storageQueryKeys.smart(),
    queryFn: storageApi.getSmartInfo,
    refetchInterval: 30_000,
  });

  return {
    partitions: partData?.data ?? [],
    smartInfo: smartData?.data ?? [],
    isLoading: partLoading || smartLoading,
  };
}
