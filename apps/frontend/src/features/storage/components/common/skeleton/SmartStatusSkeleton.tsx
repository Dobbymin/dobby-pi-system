import { Skeleton } from "@/shared";

export const SmartStatusSkeleton = () => {
  return (
    <div className='space-y-3 rounded-lg border p-4'>
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 space-y-1'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-20' />
        </div>
        <Skeleton className='h-5 w-16 shrink-0 rounded-full' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Skeleton className='h-3 w-14' />
        <Skeleton className='h-3 w-14' />
      </div>
    </div>
  );
};
