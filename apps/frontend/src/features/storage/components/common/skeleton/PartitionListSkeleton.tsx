import { Skeleton } from "@/shared";

export const PartitionListSkeleton = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-10' />
      <Skeleton className='h-10' />
      <Skeleton className='h-10' />
    </div>
  );
};
