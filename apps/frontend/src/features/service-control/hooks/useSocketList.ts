import { useQuery } from "@tanstack/react-query";

import { serviceApi, serviceQueryKeys } from "@/entities/service";

export function useSocketList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: serviceQueryKeys.sockets(),
    queryFn: serviceApi.getSockets,
  });
  return { sockets: data?.data ?? [], isLoading, refresh: refetch };
}
