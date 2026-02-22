import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api";
import { userQueryKeys } from "../constants";

export const useUserSshKeys = (username: string) =>
  useQuery({
    queryKey: userQueryKeys.sshKeys(username),
    queryFn: () => userApi.getSshKeys(username),
  });
