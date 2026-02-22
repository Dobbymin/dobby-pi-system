import { Users } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function UsersPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <Users className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>사용자 관리</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            시스템 사용자 및 그룹을 관리합니다
          </p>
        </div>
      </div>

      <Card className='min-h-[400px] items-center justify-center'>
        <p className='text-slate-400'>사용자 목록 — 구현 예정</p>
      </Card>
    </div>
  );
}
