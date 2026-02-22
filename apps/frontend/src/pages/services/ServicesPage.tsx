import { useState } from "react";

import { RefreshCw, Search, Wrench } from "lucide-react";

import {
  ServiceTable,
  SocketTable,
  TimerDetailPanel,
  TimerTable,
} from "@/features/service-control";
import { useServiceList, useSocketList, useTimerList } from "@/features/service-control";
import {
  Button,
  Card,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui";

type FilterType = "all" | "active" | "inactive" | "failed";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "실행 중" },
  { value: "failed", label: "오류" },
  { value: "inactive", label: "중지됨" },
];

export default function ServicesPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [selectedTimerName, setSelectedTimerName] = useState<string | null>(null);

  const { services, isLoading: servicesLoading, refresh: refreshServices } = useServiceList();
  const { timers, isLoading: timersLoading, refresh: refreshTimers } = useTimerList();
  const { sockets, isLoading: socketsLoading, refresh: refreshSockets } = useSocketList();

  const selectedTimer = timers.find((t) => t.name === selectedTimerName) ?? null;

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* 페이지 헤더 */}
      <div className='flex items-center gap-3'>
        <Wrench className='size-6 text-primary' />
        <div>
          <h1 className='text-xl font-bold text-slate-900 dark:text-white'>서비스 관리</h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            systemd 서비스, 타이머, 소켓을 관리합니다
          </p>
        </div>
      </div>

      <Tabs
        defaultValue='services'
        className='flex flex-col gap-0'
        onValueChange={() => setSelectedTimerName(null)}
      >
        {/* 탭 + 필터 + 검색 툴바 */}
        <Card className='overflow-hidden rounded-b-none border-b-0 p-0'>
          <div className='flex flex-col border-b border-slate-200 dark:border-slate-800'>
            {/* 탭 네비게이션 */}
            <TabsList className='h-auto justify-start gap-0 rounded-none bg-transparent p-0 px-6 pt-4'>
              <TabsTrigger
                value='services'
                className='relative rounded-none border-b-2 border-transparent px-4 pb-4 text-sm font-medium text-slate-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none dark:text-slate-400'
              >
                서비스
                {!servicesLoading && (
                  <span className='ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                    {services.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value='timers'
                className='relative rounded-none border-b-2 border-transparent px-4 pb-4 text-sm font-medium text-slate-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none dark:text-slate-400'
              >
                타이머
                {!timersLoading && (
                  <span className='ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                    {timers.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value='sockets'
                className='relative rounded-none border-b-2 border-transparent px-4 pb-4 text-sm font-medium text-slate-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none dark:text-slate-400'
              >
                소켓
                {!socketsLoading && (
                  <span className='ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                    {sockets.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* 필터 + 검색 바 */}
            <div className='flex flex-wrap items-center justify-between gap-3 px-6 py-3'>
              {/* 상태 필터 세그먼트 */}
              <div className='flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900'>
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                      filter === f.value
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* 우측: 검색 + 새로고침 */}
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                  <Input
                    placeholder='서비스 검색...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='h-9 w-52 pl-9 text-sm'
                  />
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-9 w-9'
                  onClick={() => {
                    void refreshServices();
                    void refreshTimers();
                    void refreshSockets();
                  }}
                >
                  <RefreshCw className='size-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* 탭 내용 — 테이블 */}
          <TabsContent value='services' className='m-0 overflow-x-auto'>
            <ServiceTable
              services={services}
              isLoading={servicesLoading}
              filter={filter}
              search={search}
            />
          </TabsContent>

          <TabsContent value='timers' className='m-0'>
            <div className='flex overflow-hidden'>
              <div className='min-w-0 flex-1 overflow-x-auto'>
                <TimerTable
                  timers={timers}
                  isLoading={timersLoading}
                  search={search}
                  selectedName={selectedTimerName}
                  onSelect={setSelectedTimerName}
                />
              </div>
              {selectedTimer && (
                <TimerDetailPanel
                  timer={selectedTimer}
                  onClose={() => setSelectedTimerName(null)}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value='sockets' className='m-0 overflow-x-auto'>
            <SocketTable sockets={sockets} isLoading={socketsLoading} search={search} />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
