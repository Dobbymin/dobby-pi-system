import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useContainerLogs = (id: string) =>
  useQuery({
    queryKey: dockerQueryKeys.containerLogs(id),
    queryFn: () => dockerApi.getContainerLogs(id),
  });
