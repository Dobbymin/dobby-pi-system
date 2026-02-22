import { useQuery } from "@tanstack/react-query";

import { networkApi } from "../api";
import { networkQueryKeys } from "../constants";

export const useFirewallRules = () =>
  useQuery({ queryKey: networkQueryKeys.firewallRules(), queryFn: networkApi.getFirewallRules });
