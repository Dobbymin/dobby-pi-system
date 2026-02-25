import { HardDrive } from "lucide-react";

import { Card, Progress } from "@/shared";

import { formatGB, formatSpeed } from "../../utils";

type Props = {
  mountPoint?: string;
  label?: string;
  readSpeed?: number;
  writeSpeed?: number;
  used?: number;
  total?: number;
  usagePercent?: number;
};

export const StorageInfoCard = ({
  mountPoint,
  label,
  readSpeed,
  writeSpeed,
  used,
  total,
  usagePercent,
}: Props) => {
  return (
    <Card className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
          Storage I/O
        </h3>
        <HardDrive className='size-5 text-slate-500' />
      </div>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <span className='font-medium text-slate-900 dark:text-white'>{mountPoint ?? "/"}</span>
          <span className='text-xs text-slate-500 dark:text-slate-400'>{label ?? "SD Card"}</span>
        </div>
        <div className='space-y-3'>
          <div>
            <div className='mb-1 flex justify-between text-xs'>
              <span className='text-slate-500 dark:text-slate-400'>Read</span>
              <span className='font-mono text-slate-900 dark:text-white'>
                {readSpeed !== undefined ? formatSpeed(readSpeed) : "—"}
              </span>
            </div>
            <Progress
              value={Math.min(((readSpeed ?? 0) / (8000 * 1024)) * 100, 100)}
              className='h-1.5'
            />
          </div>
          <div>
            <div className='mb-1 flex justify-between text-xs'>
              <span className='text-slate-500 dark:text-slate-400'>Write</span>
              <span className='font-mono text-slate-900 dark:text-white'>
                {writeSpeed !== undefined ? formatSpeed(writeSpeed) : "—"}
              </span>
            </div>
            <Progress
              value={Math.min(((writeSpeed ?? 0) / (4000 * 1024)) * 100, 100)}
              className='h-1.5'
            />
          </div>
        </div>
        <div className='mt-auto pt-2 text-center text-xs text-slate-500 dark:text-slate-400'>
          {used !== undefined && total !== undefined
            ? `Total Used: ${usagePercent ?? 0}% (${formatGB(used)}GB / ${formatGB(total)}GB)`
            : "—"}
        </div>
      </div>
    </Card>
  );
};
