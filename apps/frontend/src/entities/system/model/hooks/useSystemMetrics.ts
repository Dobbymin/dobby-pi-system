import { useQuery } from "@tanstack/react-query";

import { systemApi } from "../api";
import { systemQueryKeys } from "../constants";

export const useSystemMetrics = () =>
  useQuery({ queryKey: systemQueryKeys.metrics(), queryFn: systemApi.getMetrics });
