import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useDockerNetworks = () =>
  useQuery({ queryKey: dockerQueryKeys.networks(), queryFn: dockerApi.getNetworks });
