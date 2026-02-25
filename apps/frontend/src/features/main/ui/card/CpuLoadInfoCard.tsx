import { Card } from "@/shared";

type Props = {
  cpuUsage?: number;
};

export const CpuLoadInfoCard = ({ cpuUsage }: Props) => {
  return (
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
            strokeDasharray={`${cpuUsage ?? 0}, 100`}
            strokeWidth='3'
          />
        </svg>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
          <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
            {cpuUsage ? `${cpuUsage}%` : "—"}
          </span>
          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Avg Load</span>
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
  );
};
