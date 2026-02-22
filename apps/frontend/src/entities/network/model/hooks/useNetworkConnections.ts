import { useQuery } from "@tanstack/react-query";

import { networkApi } from "../api";
import { networkQueryKeys } from "../constants";

export const useNetworkConnections = () =>
  useQuery({ queryKey: networkQueryKeys.connections(), queryFn: networkApi.getConnections });
