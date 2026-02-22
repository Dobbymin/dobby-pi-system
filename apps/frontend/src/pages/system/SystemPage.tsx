import { Cpu } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function SystemPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <Cpu className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>시스템 모니터링</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            프로세스, 로그, 서비스 상태를 확인합니다
          </p>
        </div>
      </div>

      {/* Tab: Processes / Logs / Services */}
      <Card className='min-h-[400px] items-center justify-center'>
        <p className='text-slate-400'>프로세스 관리 — 구현 예정</p>
      </Card>
    </div>
  );
}
