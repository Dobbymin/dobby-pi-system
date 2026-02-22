import { useQuery } from "@tanstack/react-query";

import { serviceApi, serviceQueryKeys } from "@/entities/service";

export function useServiceLogsQuery(name: string, lines = 100, enabled = true) {
  return useQuery({
    queryKey: serviceQueryKeys.logs(name, lines),
    queryFn: () => serviceApi.getLogs(name, lines),
    enabled: enabled && !!name,
  });
}
