import { useQuery } from "@tanstack/react-query";

import { dockerApi, dockerQueryKeys } from "@/entities/container";

export function useContainerList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: dockerQueryKeys.containers(),
    queryFn: dockerApi.getContainers,
    refetchInterval: 10_000,
  });
  return { containers: data?.data ?? [], isLoading, refresh: refetch };
}
