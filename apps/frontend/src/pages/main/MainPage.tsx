import {
  CheckCircle,
  HardDrive,
  Network,
  Power,
  RefreshCw,
  RotateCw,
  Thermometer,
  TriangleAlert,
  Zap,
} from "lucide-react";

import { useSystemInfo, useSystemMetrics } from "@/entities/system";
import { Badge, Button, Card, Progress } from "@/shared/components/ui";

// ── 유틸 ────────────────────────────────────────────────────
const formatUptime = (seconds: number): string => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
};

const formatGB = (bytes: number): string => (bytes / 1024 / 1024 / 1024).toFixed(1);

const formatSpeed = (bytesPerSec: number): string => {
  if (bytesPerSec >= 1024 * 1024) return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`;
  return `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
};

// ── 컴포넌트 ─────────────────────────────────────────────────
export default function MainPage() {
  const { data: infoRes } = useSystemInfo();
  const { data: metricsRes } = useSystemMetrics(5000);

  const info = infoRes?.data;
  const metrics = metricsRes?.data;

  const cpu = metrics?.cpu;
  const memory = metrics?.memory;
  const disk = metrics?.disks?.[0];
  const net = metrics?.network?.[0];

  // 메모리 퍼센트 계산
  const memUsedPct = memory ? parseFloat(((memory.used / memory.total) * 100).toFixed(1)) : 0;
  const memCachedPct = memory ? parseFloat(((memory.cached / memory.total) * 100).toFixed(1)) : 0;

  // Storage used % (디스크 전체)
  const diskUsedPct = disk?.usagePercent ?? 0;

  return (
    <div className='px-4 py-8 sm:px-10'>
      <div className='mx-auto flex max-w-350 flex-col gap-6'>
        {/* Top Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* System Info Card */}
          <Card className='flex flex-col justify-between lg:col-span-4'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='mb-1 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                  Hostname
                </h3>
                <p className='text-2xl font-bold text-slate-900 dark:text-white'>
                  {info?.hostname ?? "—"}
                </p>
              </div>
              <Badge className='bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20'>
                Online
              </Badge>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>OS Version</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  {info?.osVersion ?? "—"}
                </span>
              </div>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>Kernel</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  {info?.kernel ?? "—"}
                </span>
              </div>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>IP Address</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  {info?.ipAddress ?? "—"}
                </span>
              </div>
              <div className='flex items-center justify-between pt-1'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>Uptime</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  {info ? formatUptime(info.uptime) : "—"}
                </span>
              </div>
            </div>
          </Card>

          {/* CPU Gauge */}
          <Card className='relative flex flex-col items-center justify-center lg:col-span-4'>
            <h3 className='absolute left-6 top-6 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              CPU Load
            </h3>
            <div className='relative mt-4 size-40'>
              <svg
                className='size-full -rotate-90'
                viewBox='0 0 36 36'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className='text-slate-100 dark:text-slate-700'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                />
                <path
                  className='text-cyan-500'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray={`${cpu?.usage ?? 0}, 100`}
                  strokeWidth='3'
                />
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
                  {cpu ? `${cpu.usage}%` : "—"}
                </span>
                <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                  Avg Load
                </span>
              </div>
            </div>
            <div className='mt-4 flex gap-4 text-xs'>
              <div className='flex items-center gap-1'>
                <div className='size-2 rounded-full bg-cyan-500' />
                <span className='text-slate-500 dark:text-slate-400'>User</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='size-2 rounded-full bg-blue-500' />
                <span className='text-slate-500 dark:text-slate-400'>System</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='size-2 rounded-full bg-slate-700' />
                <span className='text-slate-500 dark:text-slate-400'>Idle</span>
              </div>
            </div>
          </Card>

          {/* Memory Donut */}
          <Card className='relative flex flex-col items-center justify-center lg:col-span-4'>
            <h3 className='absolute left-6 top-6 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
              Memory
            </h3>
            <div className='relative mt-4 size-40'>
              <svg
                className='size-full -rotate-90 overflow-visible'
                viewBox='0 0 36 36'
                xmlns='http://www.w3.org/2000/svg'
              >
                {/* Track */}
                <path
                  className='text-slate-100 dark:text-slate-700'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='6'
                />
                {/* Used */}
                <path
                  className='text-primary'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray={`${memUsedPct}, 100`}
                  strokeWidth='6'
                />
                {/* Cached */}
                <path
                  className='text-purple-500'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray={`${memCachedPct}, 100`}
                  strokeDashoffset={`-${memUsedPct}`}
                  strokeWidth='6'
                />
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
                  {memory ? formatGB(memory.used) : "—"}
                  <span className='ml-1 text-sm text-slate-500'>GB</span>
                </span>
                <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Used</span>
              </div>
            </div>
            <div className='mt-4 flex w-full justify-around px-4 text-xs'>
              <div className='text-center'>
                <div className='font-bold text-slate-900 dark:text-white'>
                  {memory ? `${formatGB(memory.total)}GB` : "—"}
                </div>
                <span className='text-slate-500 dark:text-slate-400'>Total</span>
              </div>
              <div className='text-center'>
                <div className='font-bold text-primary'>
                  {memory ? `${formatGB(memory.used)}GB` : "—"}
                </div>
                <span className='text-slate-500 dark:text-slate-400'>Used</span>
              </div>
              <div className='text-center'>
                <div className='font-bold text-purple-500'>
                  {memory ? `${formatGB(memory.cached)}GB` : "—"}
                </div>
                <span className='text-slate-500 dark:text-slate-400'>Cached</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Middle Row: CPU Core Bars */}
        <Card>
          <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                Real-time CPU Usage
              </h3>
              <p className='text-sm text-slate-500 dark:text-slate-400'>
                {cpu?.model ?? "Cortex-A72"} · {cpu?.cores.length ?? 4} cores · {cpu?.speed ?? "—"}{" "}
                MHz
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              {(cpu?.cores ?? [0, 0, 0, 0]).map((usage, i) => {
                const colors = ["bg-cyan-400", "bg-purple-400", "bg-emerald-400", "bg-amber-400"];
                return (
                  <div
                    key={i}
                    className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800'
                  >
                    <div className={`size-2 rounded-full ${colors[i]}`} />
                    <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
                      Core {i} · {usage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='space-y-3'>
            {(cpu?.cores ?? [0, 0, 0, 0]).map((usage, i) => {
              const colors = ["bg-cyan-400", "bg-purple-400", "bg-emerald-400", "bg-amber-400"];
              return (
                <div key={i} className='flex items-center gap-3'>
                  <span className='w-12 text-right font-mono text-xs text-slate-500 dark:text-slate-400'>
                    Core {i}
                  </span>
                  <div
                    className='flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800'
                    style={{ height: "8px" }}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${colors[i]}`}
                      style={{ width: `${usage}%` }}
                    />
                  </div>
                  <span className='w-10 font-mono text-xs text-slate-700 dark:text-slate-300'>
                    {usage}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Bottom Row: Grid Metrics */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {/* Network */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                Network ({net?.iface ?? "eth0"})
              </h3>
              <Network className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col justify-end gap-2'>
              <div className='flex items-end justify-between'>
                <div>
                  <span className='block text-xs text-slate-500 dark:text-slate-400'>RX</span>
                  <span className='text-lg font-bold text-slate-900 dark:text-white'>
                    {net ? formatSpeed(net.rx) : "—"}
                  </span>
                </div>
              </div>
              <div className='h-px w-full bg-slate-100 dark:bg-slate-700' />
              <div className='flex items-end justify-between'>
                <div>
                  <span className='block text-xs text-slate-500 dark:text-slate-400'>TX</span>
                  <span className='text-lg font-bold text-slate-900 dark:text-white'>
                    {net ? formatSpeed(net.tx) : "—"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Disk I/O */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                Storage I/O
              </h3>
              <HardDrive className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <span className='font-medium text-slate-900 dark:text-white'>
                  {disk?.mountPoint ?? "/"}
                </span>
                <span className='text-xs text-slate-500 dark:text-slate-400'>
                  {disk?.label ?? "SD Card"}
                </span>
              </div>
              <div className='space-y-3'>
                <div>
                  <div className='mb-1 flex justify-between text-xs'>
                    <span className='text-slate-500 dark:text-slate-400'>Read</span>
                    <span className='font-mono text-slate-900 dark:text-white'>
                      {disk ? formatSpeed(disk.readSpeed ?? 0) : "—"}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(((disk?.readSpeed ?? 0) / (8000 * 1024)) * 100, 100)}
                    className='h-1.5'
                  />
                </div>
                <div>
                  <div className='mb-1 flex justify-between text-xs'>
                    <span className='text-slate-500 dark:text-slate-400'>Write</span>
                    <span className='font-mono text-slate-900 dark:text-white'>
                      {disk ? formatSpeed(disk.writeSpeed ?? 0) : "—"}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(((disk?.writeSpeed ?? 0) / (4000 * 1024)) * 100, 100)}
                    className='h-1.5'
                  />
                </div>
              </div>
              <div className='mt-auto pt-2 text-center text-xs text-slate-500 dark:text-slate-400'>
                {disk
                  ? `Total Used: ${diskUsedPct}% (${formatGB(disk.used)}GB / ${formatGB(disk.total)}GB)`
                  : "—"}
              </div>
            </div>
          </Card>

          {/* Temperature */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                CPU Temp
              </h3>
              <Thermometer className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='mb-2 text-5xl font-bold text-slate-900 dark:text-white'>
                {cpu ? Math.round(cpu.temperature) : "—"}
                <span className='ml-1 align-top text-2xl text-slate-500'>°C</span>
              </div>
              <div className='mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700'>
                <div
                  className='h-full rounded-full bg-linear-to-r from-emerald-500 via-amber-500 to-red-500'
                  style={{ width: `${cpu ? (cpu.temperature / 100) * 100 : 0}%` }}
                />
              </div>
              {cpu?.throttling ? (
                <div className='flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-1.5'>
                  <TriangleAlert className='size-4.5 text-amber-500' />
                  <span className='text-xs font-bold uppercase tracking-wide text-amber-500'>
                    Throttling
                  </span>
                </div>
              ) : (
                <div className='flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5'>
                  <CheckCircle className='size-4.5 text-emerald-500' />
                  <span className='text-xs font-bold uppercase tracking-wide text-emerald-500'>
                    Normal
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                Quick Actions
              </h3>
              <Zap className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col justify-center gap-3'>
              <Button
                variant='outline'
                className='group w-full justify-start gap-3 border-transparent bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700'
              >
                <RotateCw className='size-4 text-amber-500 group-hover:text-amber-400' />
                <span className='text-sm font-medium'>Reboot System</span>
              </Button>
              <Button
                variant='outline'
                className='group w-full justify-start gap-3 border-transparent bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:border-rose-500/50 hover:bg-rose-900/20 dark:bg-slate-800 dark:text-slate-200'
              >
                <Power className='size-4 text-rose-500 group-hover:text-rose-400' />
                <span className='text-sm font-medium'>Power Off</span>
              </Button>
              <Button
                variant='outline'
                className='group w-full justify-start gap-3 border-transparent bg-slate-50 px-4 py-3 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700'
              >
                <RefreshCw className='size-4 text-primary group-hover:text-blue-400' />
                <span className='text-sm font-medium'>Restart Docker</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
