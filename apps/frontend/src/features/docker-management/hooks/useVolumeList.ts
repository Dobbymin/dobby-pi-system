import { useQuery } from "@tanstack/react-query";

import { dockerApi, dockerQueryKeys } from "@/entities/container";

export function useVolumeList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: dockerQueryKeys.volumes(),
    queryFn: dockerApi.getVolumes,
  });
  return { volumes: data?.data ?? [], isLoading, refresh: refetch };
}
