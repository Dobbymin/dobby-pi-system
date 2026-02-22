import { useQuery } from "@tanstack/react-query";

import { fileApi } from "../api";
import { fileQueryKeys } from "../constants";

export const useFileSearch = (path: string, query: string) =>
  useQuery({
    queryKey: fileQueryKeys.search(path, query),
    queryFn: () => fileApi.search(path, query),
    enabled: query.length > 0,
  });
