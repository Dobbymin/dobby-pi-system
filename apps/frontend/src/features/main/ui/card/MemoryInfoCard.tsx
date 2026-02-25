import { Card } from "@/shared";

import { formatGB } from "../../utils";

type Props = {
  total?: number;
  used?: number;
  cached?: number;
  usedPct: number;
  cachedPct: number;
};

export const MemoryInfoCard = ({ total, used, cached, usedPct, cachedPct }: Props) => {
  return (
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
            strokeDasharray={`${usedPct}, 100`}
            strokeWidth='6'
          />
          {/* Cached */}
          <path
            className='text-purple-500'
            d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
            fill='none'
            stroke='currentColor'
            strokeDasharray={`${cachedPct}, 100`}
            strokeDashoffset={`-${usedPct}`}
            strokeWidth='6'
          />
        </svg>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
          <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
            {used !== undefined ? formatGB(used) : "—"}
            <span className='ml-1 text-sm text-slate-500'>GB</span>
          </span>
          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Used</span>
        </div>
      </div>
      <div className='mt-4 flex w-full justify-around px-4 text-xs'>
        <div className='text-center'>
          <div className='font-bold text-slate-900 dark:text-white'>
            {total !== undefined ? `${formatGB(total)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Total</span>
        </div>
        <div className='text-center'>
          <div className='font-bold text-primary'>
            {used !== undefined ? `${formatGB(used)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Used</span>
        </div>
        <div className='text-center'>
          <div className='font-bold text-purple-500'>
            {cached !== undefined ? `${formatGB(cached)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Cached</span>
        </div>
      </div>
    </Card>
  );
};
