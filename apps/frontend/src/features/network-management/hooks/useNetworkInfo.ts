import { useQuery } from "@tanstack/react-query";

import { networkApi, networkQueryKeys } from "@/entities/network";

export function useNetworkInfo() {
  const { data: ifacesData, isLoading: ifacesLoading } = useQuery({
    queryKey: networkQueryKeys.interfaces(),
    queryFn: networkApi.getInterfaces,
    refetchInterval: 5_000,
  });

  const { data: rulesData, isLoading: rulesLoading } = useQuery({
    queryKey: networkQueryKeys.firewallRules(),
    queryFn: networkApi.getFirewallRules,
    refetchInterval: 5_000,
  });

  return {
    interfaces: ifacesData?.data ?? [],
    firewallRules: rulesData?.data ?? [],
    isLoading: ifacesLoading || rulesLoading,
  };
}
