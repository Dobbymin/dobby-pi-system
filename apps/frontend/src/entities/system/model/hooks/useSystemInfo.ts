import { useQuery } from "@tanstack/react-query";

import { systemApi } from "../api";
import { systemQueryKeys } from "../constants";

export const useSystemInfo = () =>
  useQuery({ queryKey: systemQueryKeys.info(), queryFn: systemApi.getInfo });
