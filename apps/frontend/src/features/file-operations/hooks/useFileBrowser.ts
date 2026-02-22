import { useCallback, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fileApi, fileQueryKeys } from "@/entities/file";

export function useFileBrowser(initialPath = "/home") {
  const queryClient = useQueryClient();
  const [path, setPath] = useState(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: fileQueryKeys.list(path),
    queryFn: () => fileApi.list(path),
  });

  const entries = data?.data ?? [];

  const navigate = useCallback(
    (newPath: string) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setPath(newPath);
    },
    [history, historyIndex],
  );

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPath(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPath(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const refresh = useCallback(
    () => queryClient.invalidateQueries({ queryKey: fileQueryKeys.list(path) }),
    [queryClient, path],
  );

  return {
    path,
    entries,
    isLoading,
    navigate,
    goBack,
    goForward,
    refresh,
    canGoBack: historyIndex > 0,
    canGoForward: historyIndex < history.length - 1,
  };
}
