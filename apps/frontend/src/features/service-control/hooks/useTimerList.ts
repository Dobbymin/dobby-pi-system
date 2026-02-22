import { useQuery } from "@tanstack/react-query";

import { serviceApi, serviceQueryKeys } from "@/entities/service";

export function useTimerList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: serviceQueryKeys.timers(),
    queryFn: serviceApi.getTimers,
  });
  return { timers: data?.data ?? [], isLoading, refresh: refetch };
}
