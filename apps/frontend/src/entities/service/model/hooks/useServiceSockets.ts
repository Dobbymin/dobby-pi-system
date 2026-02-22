import { useQuery } from "@tanstack/react-query";

import { serviceApi } from "../api";
import { serviceQueryKeys } from "../constants";

export const useServiceSockets = () =>
  useQuery({ queryKey: serviceQueryKeys.sockets(), queryFn: serviceApi.getSockets });
