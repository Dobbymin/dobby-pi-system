import { Bell, Server } from "lucide-react";

import { Badge } from "@/shared/components/ui";

export const RootHeader = () => {
  return (
    <header className='sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-[#0d1117]'>
      {/* Brand */}
      <div className='flex items-center gap-2 text-slate-900 dark:text-white'>
        <Server className='size-5 text-primary' />
        <span className='text-sm font-bold tracking-tight'>Dobby Pi System</span>
      </div>

      {/* Status + Actions */}
      <div className='flex items-center gap-3'>
        <Badge className='gap-1.5 bg-emerald-500/10 text-xs text-emerald-500 ring-1 ring-inset ring-emerald-500/20'>
          <span className='size-1.5 rounded-full bg-emerald-500' />
          ubuntu-server
        </Badge>

        <button className='flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white'>
          <Bell className='size-4' />
        </button>

        <div className='size-7 rounded-full bg-primary/20 text-center text-xs font-bold leading-7 text-primary'>
          A
        </div>
      </div>
    </header>
  );
};
