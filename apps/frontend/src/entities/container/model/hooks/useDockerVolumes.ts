import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useDockerVolumes = () =>
  useQuery({ queryKey: dockerQueryKeys.volumes(), queryFn: dockerApi.getVolumes });
