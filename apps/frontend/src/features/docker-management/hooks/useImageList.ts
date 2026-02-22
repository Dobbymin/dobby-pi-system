import { useQuery } from "@tanstack/react-query";

import { dockerApi, dockerQueryKeys } from "@/entities/container";

export function useImageList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: dockerQueryKeys.images(),
    queryFn: dockerApi.getImages,
  });
  return { images: data?.data ?? [], isLoading, refresh: refetch };
}
