import { HardDrive } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function StoragePage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <HardDrive className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>스토리지 관리</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            디스크 사용량, 파티션, S.M.A.R.T 정보를 확인합니다
          </p>
        </div>
      </div>

      <Card className='min-h-[400px] items-center justify-center'>
        <p className='text-slate-400'>스토리지 개요 — 구현 예정</p>
      </Card>
    </div>
  );
}
