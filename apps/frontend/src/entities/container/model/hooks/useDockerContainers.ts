import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useDockerContainers = () =>
  useQuery({ queryKey: dockerQueryKeys.containers(), queryFn: dockerApi.getContainers });
