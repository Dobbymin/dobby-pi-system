import { Wrench } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function ServicesPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <Wrench className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>서비스 관리</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            systemd 서비스, 타이머, 소켓을 관리합니다
          </p>
        </div>
      </div>

      <Card className='min-h-[400px] items-center justify-center'>
        <p className='text-slate-400'>서비스 목록 — 구현 예정</p>
      </Card>
    </div>
  );
}
