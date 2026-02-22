import { useQueryClient } from "@tanstack/react-query";

import {
  serviceQueryKeys,
  useDisableService,
  useEnableService,
  useRestartService,
  useStartService,
  useStopService,
} from "@/entities/service";

export function useServiceActions() {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: serviceQueryKeys.all });

  const startMutation = useStartService();
  const stopMutation = useStopService();
  const restartMutation = useRestartService();
  const enableMutation = useEnableService();
  const disableMutation = useDisableService();

  const isPending = (name: string) =>
    (startMutation.isPending && startMutation.variables === name) ||
    (stopMutation.isPending && stopMutation.variables === name) ||
    (restartMutation.isPending && restartMutation.variables === name) ||
    (enableMutation.isPending && enableMutation.variables === name) ||
    (disableMutation.isPending && disableMutation.variables === name);

  return {
    isPending,
    start: (name: string) => startMutation.mutateAsync(name).then(invalidate),
    stop: (name: string) => stopMutation.mutateAsync(name).then(invalidate),
    restart: (name: string) => restartMutation.mutateAsync(name).then(invalidate),
    enable: (name: string) => enableMutation.mutateAsync(name).then(invalidate),
    disable: (name: string) => disableMutation.mutateAsync(name).then(invalidate),
  };
}
