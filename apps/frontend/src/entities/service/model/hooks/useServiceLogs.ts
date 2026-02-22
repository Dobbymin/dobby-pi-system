import { useQuery } from "@tanstack/react-query";

import { serviceApi } from "../api";
import { serviceQueryKeys } from "../constants";

export const useServiceLogs = (name: string, lines?: number) =>
  useQuery({
    queryKey: serviceQueryKeys.logs(name, lines),
    queryFn: () => serviceApi.getLogs(name, lines),
  });
