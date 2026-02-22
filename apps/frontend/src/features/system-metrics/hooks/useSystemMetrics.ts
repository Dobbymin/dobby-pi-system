import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { systemApi, systemQueryKeys } from "@/entities/system";
import type { SystemMetrics } from "@/entities/system";
import { socketClient } from "@/shared/lib";

export function useSystemMetrics() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: systemQueryKeys.metrics(),
    queryFn: systemApi.getMetrics,
  });

  useEffect(() => {
    socketClient.connect();
    socketClient.send("subscribe:metrics");

    const unsubscribe = socketClient.subscribe("system:metrics", (newData) => {
      queryClient.setQueryData(systemQueryKeys.metrics(), {
        data: newData as SystemMetrics,
      });
    });

    return () => {
      unsubscribe();
      socketClient.send("unsubscribe:metrics");
    };
  }, [queryClient]);

  return { metrics: data?.data ?? null, isLoading };
}
