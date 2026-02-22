import { useState } from "react";

import { FileText, Loader2, Play, RefreshCw, Square } from "lucide-react";

import type { Service, ServiceEnabled } from "@/entities/service";
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui";
import { cn } from "@/shared/utils";

import { useServiceActions } from "../../hooks";

import { ServiceLogsDialog } from "./ServiceLogsDialog";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

type FilterType = "all" | "active" | "inactive" | "failed";

type Props = {
  services: Service[];
  isLoading: boolean;
  filter: FilterType;
  search: string;
};

function isEnabledChecked(enabled: ServiceEnabled) {
  return enabled === "enabled" || enabled === "static";
}

function isEnabledSwitchDisabled(enabled: ServiceEnabled) {
  return enabled === "static" || enabled === "masked";
}

export function ServiceTable({ services, isLoading, filter, search }: Props) {
  const actions = useServiceActions();
  const [logsTarget, setLogsTarget] = useState<string | null>(null);

  const filtered = services.filter((s) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && (s.status === "active" || s.status === "activating")) ||
      (filter === "inactive" && (s.status === "inactive" || s.status === "deactivating")) ||
      (filter === "failed" && s.status === "failed");

    const matchesSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className='flex h-48 items-center justify-center text-slate-400'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        <span className='text-sm'>로딩 중...</span>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/30'>
            <TableHead className='w-1/4 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              서비스명
            </TableHead>
            <TableHead className='w-32 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              상태
            </TableHead>
            <TableHead className='w-24 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              자동시작
            </TableHead>
            <TableHead className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              설명
            </TableHead>
            <TableHead className='w-48 px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              액션
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='h-32 text-center text-sm text-slate-400'>
                서비스가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((service) => {
              const pending = actions.isPending(service.name);
              return (
                <TableRow
                  key={service.name}
                  className={cn(
                    "group border-slate-100 transition-colors dark:border-slate-800",
                    "hover:bg-slate-50 dark:hover:bg-slate-800/30",
                  )}
                >
                  {/* 서비스명 */}
                  <TableCell className='px-6 py-4'>
                    <span className='font-medium text-slate-900 dark:text-white'>
                      {service.name}
                    </span>
                    {service.pid && (
                      <span className='ml-2 font-mono text-xs text-slate-400'>
                        PID {service.pid}
                      </span>
                    )}
                  </TableCell>

                  {/* 상태 */}
                  <TableCell className='px-6 py-4'>
                    <ServiceStatusBadge status={service.status} />
                  </TableCell>

                  {/* 자동시작 토글 */}
                  <TableCell className='px-6 py-4 text-center'>
                    <Switch
                      checked={isEnabledChecked(service.enabled)}
                      disabled={isEnabledSwitchDisabled(service.enabled) || pending}
                      onCheckedChange={(checked) =>
                        checked ? actions.enable(service.name) : actions.disable(service.name)
                      }
                    />
                  </TableCell>

                  {/* 설명 */}
                  <TableCell className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
                    {service.description}
                  </TableCell>

                  {/* 액션 */}
                  <TableCell className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-1 opacity-50 transition-opacity group-hover:opacity-100'>
                      {pending ? (
                        <Loader2 className='size-4 animate-spin text-slate-400' />
                      ) : (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500'
                                onClick={() => actions.start(service.name)}
                              >
                                <Play className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>시작</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-slate-400 hover:bg-red-500/10 hover:text-red-400'
                                onClick={() => actions.stop(service.name)}
                              >
                                <Square className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>정지</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-primary hover:bg-primary/10'
                                onClick={() => actions.restart(service.name)}
                              >
                                <RefreshCw className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>재시작</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                onClick={() => setLogsTarget(service.name)}
                              >
                                <FileText className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>로그 보기</TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <ServiceLogsDialog
        open={logsTarget !== null}
        name={logsTarget ?? ""}
        onClose={() => setLogsTarget(null)}
      />
    </>
  );
}
