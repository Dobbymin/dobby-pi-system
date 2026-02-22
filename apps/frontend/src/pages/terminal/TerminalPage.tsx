import { Shell } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function TerminalPage() {
  return (
    <div className='flex h-full flex-col gap-4 p-6'>
      <div className='flex items-center gap-3'>
        <Shell className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>터미널</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            웹 브라우저에서 직접 셸 명령을 실행합니다
          </p>
        </div>
      </div>

      <Card className='flex flex-1 items-center justify-center bg-black font-mono'>
        <p className='text-green-400'>xterm.js 터미널 — 구현 예정</p>
      </Card>
    </div>
  );
}
