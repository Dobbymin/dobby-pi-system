import { useQuery } from "@tanstack/react-query";

import { storageApi } from "../api";
import { storageQueryKeys } from "../constants";

export const useSmartInfo = () =>
  useQuery({ queryKey: storageQueryKeys.smart(), queryFn: storageApi.getSmartInfo });
