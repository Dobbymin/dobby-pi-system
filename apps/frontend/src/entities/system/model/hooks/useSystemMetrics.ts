import { useQuery } from "@tanstack/react-query";

import { systemApi } from "../api";
import { systemQueryKeys } from "../constants";

export const useSystemMetrics = (refetchInterval = 5000) =>
  useQuery({
    queryKey: systemQueryKeys.metrics(),
    queryFn: systemApi.getMetrics,
    refetchInterval,
  });
