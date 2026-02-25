import { CheckCircle, Thermometer, TriangleAlert } from "lucide-react";

import { Card } from "@/shared";

type Props = {
  temperature?: number;
  throttling?: boolean;
};

export const CpuTempInfoCard = ({ temperature, throttling }: Props) => {
  return (
    <Card className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
          CPU Temp
        </h3>
        <Thermometer className='size-5 text-slate-500' />
      </div>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div className='mb-2 text-5xl font-bold text-slate-900 dark:text-white'>
          {temperature !== undefined ? Math.round(temperature) : "—"}
          <span className='ml-1 align-top text-2xl text-slate-500'>°C</span>
        </div>
        <div className='mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700'>
          <div
            className='h-full rounded-full bg-linear-to-r from-emerald-500 via-amber-500 to-red-500'
            style={{ width: `${temperature !== undefined ? (temperature / 100) * 100 : 0}%` }}
          />
        </div>
        {throttling ? (
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
  );
};
