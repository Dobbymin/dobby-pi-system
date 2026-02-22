import { useQuery } from "@tanstack/react-query";

import { serviceApi } from "../api";
import { serviceQueryKeys } from "../constants";

export const useServices = () =>
  useQuery({ queryKey: serviceQueryKeys.list(), queryFn: serviceApi.getAll });
