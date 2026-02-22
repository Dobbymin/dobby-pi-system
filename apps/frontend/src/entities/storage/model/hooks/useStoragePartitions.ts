import { useQuery } from "@tanstack/react-query";

import { storageApi } from "../api";
import { storageQueryKeys } from "../constants";

export const useStoragePartitions = () =>
  useQuery({ queryKey: storageQueryKeys.partitions(), queryFn: storageApi.getPartitions });
