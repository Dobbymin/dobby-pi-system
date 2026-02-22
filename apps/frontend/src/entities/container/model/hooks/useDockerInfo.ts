import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useDockerInfo = () =>
  useQuery({ queryKey: dockerQueryKeys.info(), queryFn: dockerApi.getInfo });
