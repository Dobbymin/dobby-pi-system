import { useQuery } from "@tanstack/react-query";

import { fileApi } from "../api";
import { fileQueryKeys } from "../constants";

export const useFileContent = (path: string) =>
  useQuery({ queryKey: fileQueryKeys.content(path), queryFn: () => fileApi.read(path) });
