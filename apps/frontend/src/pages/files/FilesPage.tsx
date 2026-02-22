import { FileText } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function FilesPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <FileText className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>파일 탐색기</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            파일 시스템을 탐색하고 관리합니다
          </p>
        </div>
      </div>

      <Card className='min-h-[400px] items-center justify-center'>
        <p className='text-slate-400'>파일 브라우저 — 구현 예정</p>
      </Card>
    </div>
  );
}
