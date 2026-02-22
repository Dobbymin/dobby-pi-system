import { useQuery } from "@tanstack/react-query";

import { serviceApi, serviceQueryKeys } from "@/entities/service";

export function useServiceList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: serviceQueryKeys.list(),
    queryFn: serviceApi.getAll,
  });
  return { services: data?.data ?? [], isLoading, refresh: refetch };
}
