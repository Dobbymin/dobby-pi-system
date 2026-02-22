import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api";
import { userQueryKeys } from "../constants";

export const useUsers = () => useQuery({ queryKey: userQueryKeys.list(), queryFn: userApi.getAll });
