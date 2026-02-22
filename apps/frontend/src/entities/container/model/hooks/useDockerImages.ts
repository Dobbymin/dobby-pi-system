import { useQuery } from "@tanstack/react-query";

import { dockerApi } from "../api";
import { dockerQueryKeys } from "../constants";

export const useDockerImages = () =>
  useQuery({ queryKey: dockerQueryKeys.images(), queryFn: dockerApi.getImages });
