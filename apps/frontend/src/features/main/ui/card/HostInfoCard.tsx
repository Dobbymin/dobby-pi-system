import { Badge, Card } from "@/shared";

import { formatUptime } from "../../utils";

type Props = {
  hostname?: string;
  osVersion?: string;
  kernel?: string;
  ipAddress?: string;
  uptime: number;
};

export const HostInfoCard = ({ hostname, osVersion, kernel, ipAddress, uptime }: Props) => {
  return (
    <Card className='flex flex-col justify-between lg:col-span-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='mb-1 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            Hostname
          </h3>
          <p className='text-2xl font-bold text-slate-900 dark:text-white'>{hostname ?? "—"}</p>
        </div>
        <Badge className='bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20'>
          Online
        </Badge>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>OS Version</span>
          <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
            {osVersion ?? "—"}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>Kernel</span>
          <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
            {kernel ?? "—"}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>IP Address</span>
          <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
            {ipAddress ?? "—"}
          </span>
        </div>
        <div className='flex items-center justify-between pt-1'>
          <span className='text-sm text-slate-500 dark:text-slate-400'>Uptime</span>
          <span className='font-mono text-sm font-medium text-slate-900 dark:text-white'>
            {formatUptime(uptime)}
          </span>
        </div>
      </div>
    </Card>
  );
};
