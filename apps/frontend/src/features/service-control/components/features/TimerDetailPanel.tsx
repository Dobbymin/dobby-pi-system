import { Loader2, Play, Square, X } from "lucide-react";

import type { Timer } from "@/entities/service";
import { Button } from "@/shared/components/ui";

import { useServiceActions } from "../../hooks/useServiceActions";
import { useServiceList } from "../../hooks/useServiceList";
import { useServiceLogsQuery } from "../../hooks/useServiceLogsQuery";

import { ServiceStatusBadge } from "./ServiceStatusBadge";

type Props = {
  timer: Timer;
  onClose: () => void;
};

type LogParts = {
  timestamp: string;
  host: string;
  message: string;
};

function parseLogLine(line: string): LogParts | null {
  const match = line.match(/^(\w{3}\s+\d{1,2}\s+[\d:]+)\s+(\S+)\s+(.*)$/);
  if (!match) return null;
  return { timestamp: match[1], host: match[2], message: match[3] };
}

export function TimerDetailPanel({ timer, onClose }: Props) {
  const serviceName = timer.name.replace(".timer", ".service");

  const { services } = useServiceList();
  const service = services.find((s) => s.name === serviceName);

  const { data: logsData, isLoading: logsLoading } = useServiceLogsQuery(serviceName, 20, true);
  const logs = logsData?.data ?? [];

  const actions = useServiceActions();
  const pending = actions.isPending(serviceName);

  return (
    <aside className='flex w-[440px] flex-none flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#1c242c]'>
      {/* 헤더 */}
      <div className='flex items-start justify-between border-b border-slate-200 p-5 dark:border-slate-700'>
        <div className='min-w-0 flex-1'>
          <h2 className='truncate text-base font-bold text-slate-900 dark:text-white'>
            {timer.name}
          </h2>
          <p className='mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400'>
            {timer.description}
          </p>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='ml-2 h-8 w-8 flex-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          onClick={onClose}
        >
          <X className='size-4' />
        </Button>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className='flex-1 space-y-5 overflow-y-auto p-5'>
        {/* 상태 카드 */}
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#111418]'>
          <div className='mb-4 flex items-center justify-between'>
            <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>상태</span>
            <ServiceStatusBadge status={timer.status} />
          </div>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <p className='mb-1 text-xs text-slate-500 dark:text-slate-400'>연결 서비스</p>
              <p className='truncate font-mono text-xs text-slate-900 dark:text-white'>
                {serviceName}
              </p>
            </div>
            <div>
              <p className='mb-1 text-xs text-slate-500 dark:text-slate-400'>서비스 PID</p>
              <p className='font-mono text-slate-900 dark:text-white'>{service?.pid ?? "—"}</p>
            </div>
            <div className='col-span-2'>
              <p className='mb-1 text-xs text-slate-500 dark:text-slate-400'>Unit 파일 경로</p>
              <p className='break-all font-mono text-xs text-slate-900 dark:text-white'>
                /lib/systemd/system/{timer.name}
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className='grid grid-cols-2 gap-3'>
          <Button
            className='gap-2'
            disabled={pending}
            onClick={() => void actions.start(serviceName)}
          >
            {pending ? <Loader2 className='size-4 animate-spin' /> : <Play className='size-4' />}
            시작
          </Button>
          <Button
            variant='secondary'
            className='gap-2'
            disabled={pending}
            onClick={() => void actions.stop(serviceName)}
          >
            {pending ? <Loader2 className='size-4 animate-spin' /> : <Square className='size-4' />}
            정지
          </Button>
        </div>

        {/* 로그 뷰어 */}
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-sm font-bold text-slate-900 dark:text-white'>
              최근 로그 (journalctl)
            </h3>
            <span className='text-xs text-slate-500 dark:text-slate-400'>최근 20줄</span>
          </div>
          <div className='max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-3'>
            {logsLoading ? (
              <div className='flex items-center gap-2 text-xs text-slate-500'>
                <Loader2 className='size-3 animate-spin' />
                로딩 중...
              </div>
            ) : logs.length === 0 ? (
              <p className='text-xs text-slate-500'>로그가 없습니다.</p>
            ) : (
              <div className='space-y-0.5 font-mono text-xs leading-relaxed'>
                {logs.map((line, i) => {
                  const parts = parseLogLine(line);
                  if (parts) {
                    return (
                      <div key={i} className='whitespace-nowrap'>
                        <span className='text-slate-500'>{parts.timestamp}</span>{" "}
                        <span className='text-blue-400'>{parts.host}</span>{" "}
                        <span className='text-slate-300'>{parts.message}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className='whitespace-nowrap text-slate-300'>
                      {line}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
