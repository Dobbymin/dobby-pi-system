import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { processApi, processQueryKeys } from "@/entities/process";
import type { ProcessFilter } from "@/entities/process";

export function useProcessList(filter?: ProcessFilter) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: processQueryKeys.list(),
    queryFn: processApi.getAll,
    refetchInterval: 5_000,
  });

  const processes = useMemo(() => {
    let list = data?.data ?? [];
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.command.toLowerCase().includes(q) ||
          p.user.toLowerCase().includes(q),
      );
    }
    return list;
  }, [data, filter]);

  return { processes, isLoading, refresh: refetch };
}
