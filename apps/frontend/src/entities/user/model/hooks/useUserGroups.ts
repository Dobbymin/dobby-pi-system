import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api";
import { userQueryKeys } from "../constants";

export const useUserGroups = () =>
  useQuery({ queryKey: userQueryKeys.groups(), queryFn: userApi.getGroups });
