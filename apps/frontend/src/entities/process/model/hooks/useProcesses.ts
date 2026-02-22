import { useQuery } from "@tanstack/react-query";

import { processApi } from "../api";
import { processQueryKeys } from "../constants";

export const useProcesses = () =>
  useQuery({ queryKey: processQueryKeys.list(), queryFn: processApi.getAll });
