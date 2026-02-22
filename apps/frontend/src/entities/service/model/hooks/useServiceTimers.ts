import { useQuery } from "@tanstack/react-query";

import { serviceApi } from "../api";
import { serviceQueryKeys } from "../constants";

export const useServiceTimers = () =>
  useQuery({ queryKey: serviceQueryKeys.timers(), queryFn: serviceApi.getTimers });
