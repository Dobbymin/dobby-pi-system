import { useQuery } from "@tanstack/react-query";

import { fileApi } from "../api";
import { fileQueryKeys } from "../constants";

export const useFileList = (path: string) =>
  useQuery({ queryKey: fileQueryKeys.list(path), queryFn: () => fileApi.list(path) });
