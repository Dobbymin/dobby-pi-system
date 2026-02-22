import { Network } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function NetworkPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <Network className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>네트워크 관리</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            인터페이스, 방화벽, 연결 상태를 관리합니다
          </p>
        </div>
      </div>

      <Card className='min-h-100 items-center justify-center'>
        <p className='text-slate-400'>네트워크 인터페이스 — 구현 예정</p>
      </Card>
    </div>
  );
}
