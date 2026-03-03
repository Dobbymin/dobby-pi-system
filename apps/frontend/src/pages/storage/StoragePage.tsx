import { HardDrive } from "lucide-react";

import { DiskUsageOverviewCard, PartitionListCard, SmartStatusCard } from "@/features";

export default function StoragePage() {
  return (
    <div className='flex w-full flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <HardDrive className='text-primary size-8' />
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>스토리지 관리</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            디스크 사용량, 파티션, S.M.A.R.T 정보를 확인하고 관리합니다
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-5 md:items-stretch'>
        <div className='md:col-span-3'>
          <DiskUsageOverviewCard />
        </div>
        <div className='flex flex-col md:col-span-2'>
          <SmartStatusCard />
        </div>
      </div>

      <div className='w-full'>
        <PartitionListCard />
      </div>
    </div>
  );
}
