import { Network } from "lucide-react";

import { Card } from "@/shared";

import { formatSpeed } from "../../utils";

type Props = {
  iface?: string;
  rx?: number;
  tx?: number;
};

export const NetworkInfoCard = ({ iface, rx, tx }: Props) => {
  return (
    <Card className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
          Network ({iface ?? "eth0"})
        </h3>
        <Network className='size-5 text-slate-500' />
      </div>
      <div className='flex flex-1 flex-col justify-end gap-2'>
        <div className='flex items-end justify-between'>
          <div>
            <span className='block text-xs text-slate-500 dark:text-slate-400'>RX</span>
            <span className='text-lg font-bold text-slate-900 dark:text-white'>
              {rx !== undefined ? formatSpeed(rx) : "—"}
            </span>
          </div>
        </div>
        <div className='h-px w-full bg-slate-100 dark:bg-slate-700' />
        <div className='flex items-end justify-between'>
          <div>
            <span className='block text-xs text-slate-500 dark:text-slate-400'>TX</span>
            <span className='text-lg font-bold text-slate-900 dark:text-white'>
              {tx !== undefined ? formatSpeed(tx) : "—"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
