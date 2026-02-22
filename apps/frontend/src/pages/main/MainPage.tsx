import {
  CheckCircle,
  HardDrive,
  Network,
  Power,
  RefreshCw,
  RotateCw,
  Thermometer,
  Zap,
} from "lucide-react";

import { Badge, Button, Card, Progress } from "@/shared/components/ui";

export default function MainPage() {
  return (
    <div className='px-4 py-8 sm:px-10'>
      <div className='mx-auto flex max-w-350 flex-col gap-6'>
        {/* Top Row: Status Overview */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* System Info Card */}
          <Card className='flex flex-col justify-between lg:col-span-4'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='mb-1 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                  Hostname
                </h3>
                <p className='text-2xl font-bold text-slate-900 dark:text-white'>ubuntu-server</p>
              </div>
              <Badge className='bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20'>
                Online
              </Badge>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>OS Version</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  Ubuntu 22.04.3 LTS
                </span>
              </div>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>Kernel</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  Linux 5.15.0-raspi
                </span>
              </div>
              <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>IP Address</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  192.168.1.45
                </span>
              </div>
              <div className='flex items-center justify-between pt-1'>
                <span className='text-sm text-slate-500 dark:text-slate-400'>Uptime</span>
                <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
                  14d 3h 12m
                </span>
              </div>
            </div>
          </Card>

          {/* CPU Aggregate Gauge */}
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
                  strokeDasharray='15, 100'
                  strokeWidth='3'
                />
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                <span className='block text-3xl font-bold text-slate-900 dark:text-white'>15%</span>
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
                className='size-full -rotate-90'
                viewBox='0 0 36 36'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className='text-slate-100 dark:text-slate-700'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='6'
                />
                <path
                  className='text-primary'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray='30, 100'
                  strokeWidth='6'
                />
                <path
                  className='text-purple-500'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray='20, 100'
                  strokeDashoffset='-30'
                  strokeWidth='6'
                />
              </svg>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
                  1.2
                  <span className='ml-1 text-sm text-slate-500'>GB</span>
                </span>
                <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Used</span>
              </div>
            </div>
            <div className='mt-4 flex w-full justify-around px-4 text-xs'>
              <div className='text-center'>
                <div className='font-bold text-slate-900 dark:text-white'>4.0GB</div>
                <span className='text-slate-500 dark:text-slate-400'>Total</span>
              </div>
              <div className='text-center'>
                <div className='font-bold text-primary'>1.2GB</div>
                <span className='text-slate-500 dark:text-slate-400'>Used</span>
              </div>
              <div className='text-center'>
                <div className='font-bold text-purple-500'>0.8GB</div>
                <span className='text-slate-500 dark:text-slate-400'>Cached</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Middle Row: Real-time CPU Chart */}
        <Card>
          <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                Real-time CPU Usage
              </h3>
              <p className='text-sm text-slate-500 dark:text-slate-400'>
                Individual core performance over the last 60 seconds
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              {[
                { name: "Core 0", color: "bg-cyan-400" },
                { name: "Core 1", color: "bg-purple-400" },
                { name: "Core 2", color: "bg-emerald-400" },
                { name: "Core 3", color: "bg-amber-400" },
              ].map((core) => (
                <div
                  key={core.name}
                  className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800'
                >
                  <div className={`size-2 rounded-full ${core.color}`} />
                  <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
                    {core.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='relative h-62.5 w-full'>
            <svg className='absolute inset-0 h-full w-full' preserveAspectRatio='none'>
              <line
                className='stroke-slate-200 dark:stroke-slate-700'
                strokeWidth='1'
                x1='0'
                x2='100%'
                y1='20%'
                y2='20%'
              />
              <line
                className='stroke-slate-200 dark:stroke-slate-700'
                strokeWidth='1'
                x1='0'
                x2='100%'
                y1='40%'
                y2='40%'
              />
              <line
                className='stroke-slate-200 dark:stroke-slate-700'
                strokeWidth='1'
                x1='0'
                x2='100%'
                y1='60%'
                y2='60%'
              />
              <line
                className='stroke-slate-200 dark:stroke-slate-700'
                strokeWidth='1'
                x1='0'
                x2='100%'
                y1='80%'
                y2='80%'
              />
            </svg>
            <svg
              className='absolute inset-0 h-full w-full overflow-visible'
              preserveAspectRatio='none'
              viewBox='0 0 100 100'
            >
              <path
                d='M0,80 C10,75 20,40 30,45 C40,50 50,60 60,55 C70,50 80,30 90,35 L100,40'
                fill='none'
                stroke='#22d3ee'
                strokeWidth='2'
                vectorEffect='non-scaling-stroke'
              />
              <path
                d='M0,70 C15,65 25,75 35,70 C45,65 55,50 65,55 C75,60 85,65 95,60 L100,58'
                fill='none'
                stroke='#a855f7'
                strokeWidth='2'
                vectorEffect='non-scaling-stroke'
              />
              <path
                d='M0,85 C10,82 20,80 30,82 C40,84 50,70 60,72 C70,74 80,78 90,76 L100,75'
                fill='none'
                stroke='#34d399'
                strokeWidth='2'
                vectorEffect='non-scaling-stroke'
              />
              <path
                d='M0,60 C10,55 20,58 30,55 C40,52 50,40 60,42 C70,44 80,50 90,48 L100,50'
                fill='none'
                stroke='#fbbf24'
                strokeWidth='2'
                vectorEffect='non-scaling-stroke'
              />
            </svg>
          </div>
          <div className='mt-2 flex justify-between font-mono text-xs text-slate-500 dark:text-slate-400'>
            <span>60s ago</span>
            <span>45s</span>
            <span>30s</span>
            <span>15s</span>
            <span>Now</span>
          </div>
        </Card>

        {/* Bottom Row: Grid Metrics */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {/* Network Traffic */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                Network (eth0)
              </h3>
              <Network className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col justify-end gap-2'>
              <div className='flex items-end justify-between'>
                <div>
                  <span className='block text-xs text-slate-500 dark:text-slate-400'>RX</span>
                  <span className='text-lg font-bold text-slate-900 dark:text-white'>
                    12.4 <span className='text-sm font-normal text-slate-500'>MB/s</span>
                  </span>
                </div>
                <div className='flex h-10 w-24 items-end gap-1'>
                  <div className='w-1 rounded-t-sm bg-primary/30' style={{ height: "30%" }} />
                  <div className='w-1 rounded-t-sm bg-primary/50' style={{ height: "60%" }} />
                  <div className='w-1 rounded-t-sm bg-primary' style={{ height: "45%" }} />
                  <div className='w-1 rounded-t-sm bg-primary' style={{ height: "80%" }} />
                  <div className='w-1 rounded-t-sm bg-primary/70' style={{ height: "50%" }} />
                  <div className='w-1 rounded-t-sm bg-primary/40' style={{ height: "20%" }} />
                </div>
              </div>
              <div className='h-px w-full bg-slate-100 dark:bg-slate-700' />
              <div className='flex items-end justify-between'>
                <div>
                  <span className='block text-xs text-slate-500 dark:text-slate-400'>TX</span>
                  <span className='text-lg font-bold text-slate-900 dark:text-white'>
                    0.8 <span className='text-sm font-normal text-slate-500'>MB/s</span>
                  </span>
                </div>
                <div className='flex h-10 w-24 items-end gap-1'>
                  <div className='w-1 rounded-t-sm bg-purple-500/30' style={{ height: "10%" }} />
                  <div className='w-1 rounded-t-sm bg-purple-500/50' style={{ height: "20%" }} />
                  <div className='w-1 rounded-t-sm bg-purple-500' style={{ height: "15%" }} />
                  <div className='w-1 rounded-t-sm bg-purple-500' style={{ height: "30%" }} />
                  <div className='w-1 rounded-t-sm bg-purple-500/70' style={{ height: "10%" }} />
                  <div className='w-1 rounded-t-sm bg-purple-500/40' style={{ height: "5%" }} />
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
                <span className='font-medium text-slate-900 dark:text-white'>/root</span>
                <span className='text-xs text-slate-500 dark:text-slate-400'>SD Card</span>
              </div>
              <div className='space-y-3'>
                <div>
                  <div className='mb-1 flex justify-between text-xs'>
                    <span className='text-slate-500 dark:text-slate-400'>Read</span>
                    <span className='font-mono text-slate-900 dark:text-white'>152 KB/s</span>
                  </div>
                  <Progress value={15} className='h-1.5' />
                </div>
                <div>
                  <div className='mb-1 flex justify-between text-xs'>
                    <span className='text-slate-500 dark:text-slate-400'>Write</span>
                    <span className='font-mono text-slate-900 dark:text-white'>2.1 MB/s</span>
                  </div>
                  <Progress value={45} className='h-1.5' />
                </div>
              </div>
              <div className='mt-auto pt-2 text-center text-xs text-slate-500 dark:text-slate-400'>
                Total Used: 68% (21GB / 32GB)
              </div>
            </div>
          </Card>

          {/* Temperature & Throttling */}
          <Card className='flex flex-col'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                CPU Temp
              </h3>
              <Thermometer className='size-5 text-slate-500' />
            </div>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='mb-2 text-5xl font-bold text-slate-900 dark:text-white'>
                42
                <span className='ml-1 align-top text-2xl text-slate-500'>°C</span>
              </div>
              <div className='mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700'>
                <div
                  className='h-full rounded-full bg-linear-to-r from-emerald-500 via-amber-500 to-red-500'
                  style={{ width: "42%" }}
                />
              </div>
              <div className='flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5'>
                <CheckCircle className='size-4.5 text-emerald-500' />
                <span className='text-xs font-bold uppercase tracking-wide text-emerald-500'>
                  Normal
                </span>
              </div>
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
