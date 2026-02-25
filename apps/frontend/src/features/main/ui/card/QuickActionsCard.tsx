import { Power, RefreshCw, RotateCw, Zap } from "lucide-react";

import { Button, Card } from "@/shared";

export const QuickActionsCard = () => {
  return (
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
  );
};
