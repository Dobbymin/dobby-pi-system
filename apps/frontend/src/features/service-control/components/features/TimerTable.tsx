import { ChevronRight, Clock, Loader2 } from "lucide-react";

import type { Timer } from "@/entities/service";
import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import { cn } from "@/shared/utils";

import { ServiceStatusBadge } from "./ServiceStatusBadge";

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getRelativeTime(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff < 0) return "경과됨";
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}일 ${hours}시간 후`;
  if (hours > 0) return `${hours}시간 ${minutes}분 후`;
  return `${minutes}분 후`;
}

type Props = {
  timers: Timer[];
  isLoading: boolean;
  search: string;
  selectedName?: string | null;
  onSelect?: (name: string | null) => void;
};

export function TimerTable({ timers, isLoading, search, selectedName, onSelect }: Props) {
  const filtered = timers.filter(
    (t) =>
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className='flex h-48 items-center justify-center text-slate-400'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        <span className='text-sm'>로딩 중...</span>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/30'>
          <TableHead className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            타이머
          </TableHead>
          <TableHead className='w-32 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            상태
          </TableHead>
          <TableHead className='w-44 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            마지막 실행
          </TableHead>
          <TableHead className='w-52 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            다음 실행
          </TableHead>
          <TableHead className='w-24 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            부팅 시 시작
          </TableHead>
          <TableHead className='w-10 px-4' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className='h-32 text-center text-sm text-slate-400'>
              타이머가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          filtered.map((timer) => {
            const isSelected = selectedName === timer.name;
            return (
              <TableRow
                key={timer.name}
                onClick={() => onSelect?.(isSelected ? null : timer.name)}
                className={cn(
                  "cursor-pointer border-l-4 transition-colors",
                  isSelected
                    ? "border-l-primary bg-blue-50/50 hover:bg-blue-50 dark:bg-[#137fec]/10 dark:hover:bg-[#137fec]/15"
                    : "border-l-transparent hover:bg-slate-50 dark:border-l-transparent dark:hover:bg-slate-800/30",
                )}
              >
                {/* 타이머명 + 연결 서비스 */}
                <TableCell className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Clock
                      className={cn(
                        "size-4 flex-none",
                        isSelected ? "text-primary" : "text-slate-400",
                      )}
                    />
                    <div>
                      <div
                        className={cn(
                          "text-sm text-slate-900 dark:text-white",
                          isSelected ? "font-bold" : "font-medium",
                        )}
                      >
                        {timer.name}
                      </div>
                      <div className='font-mono text-xs text-slate-500 dark:text-slate-400'>
                        {timer.name.replace(".timer", ".service")}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* 상태 */}
                <TableCell className='px-6 py-4'>
                  <ServiceStatusBadge status={timer.status} />
                </TableCell>

                {/* 마지막 실행 */}
                <TableCell className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
                  {timer.lastTrigger ? formatDate(timer.lastTrigger) : "—"}
                </TableCell>

                {/* 다음 실행 + 상대시간 */}
                <TableCell className='px-6 py-4'>
                  {timer.nextTrigger ? (
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-slate-900 dark:text-white'>
                        {formatDate(timer.nextTrigger)}
                      </span>
                      <span className='text-xs text-slate-500 dark:text-slate-400'>
                        {getRelativeTime(timer.nextTrigger)}
                      </span>
                    </div>
                  ) : (
                    <span className='text-sm text-slate-400 dark:text-slate-500'>—</span>
                  )}
                </TableCell>

                {/* 부팅 시 시작 토글 */}
                <TableCell className='px-6 py-4 text-center'>
                  <Switch checked={timer.status === "active"} disabled />
                </TableCell>

                {/* chevron */}
                <TableCell className='px-4 py-4 text-right'>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-colors",
                      isSelected ? "text-primary" : "text-slate-400",
                    )}
                  />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
