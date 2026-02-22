import { useQuery } from "@tanstack/react-query";

import { networkApi } from "../api";
import { networkQueryKeys } from "../constants";

export const useNetworkInterfaces = () =>
  useQuery({ queryKey: networkQueryKeys.interfaces(), queryFn: networkApi.getInterfaces });
