import { Settings } from "lucide-react";

import { Card } from "@/shared/components/ui";

export default function SettingsPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center gap-3'>
        <Settings className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>설정</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            대시보드 및 시스템 설정을 관리합니다
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
        {/* Sidebar */}
        <Card className='h-fit md:col-span-1'>
          <nav className='flex flex-col gap-1'>
            {["외관", "알림", "보안", "시스템", "백업"].map((item) => (
              <button
                key={item}
                className='rounded-md px-3 py-2 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white'
              >
                {item}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className='min-h-75 items-center justify-center md:col-span-3'>
          <p className='text-slate-400'>설정 패널 — 구현 예정</p>
        </Card>
      </div>
    </div>
  );
}
