import { useSystemInfo, useSystemMetrics } from "@/entities/system";
import {
  CpuLoadInfoCard,
  CpuTempInfoCard,
  CpuUsageCard,
  HostInfoCard,
  MemoryInfoCard,
  NetworkInfoCard,
  QuickActionsCard,
  StorageInfoCard,
} from "@/features";

// ── 컴포넌트 ─────────────────────────────────────────────────
export default function MainPage() {
  const { data: systemInfoData, isLoading: isSystemInfoLoading } = useSystemInfo();
  const { data: metricsRes } = useSystemMetrics(5000);

  const info = systemInfoData?.data;

  if (isSystemInfoLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <span className='text-sm text-slate-500'>Loading system information...</span>
      </div>
    );
  }
  const metrics = metricsRes?.data;

  const cpu = metrics?.cpu;
  const memory = metrics?.memory;
  const disk = metrics?.disks?.[0];
  const net = metrics?.network?.[0];

  // 메모리 퍼센트 계산
  const memUsedPct = memory ? parseFloat(((memory.used / memory.total) * 100).toFixed(1)) : 0;
  const memCachedPct = memory ? parseFloat(((memory.cached / memory.total) * 100).toFixed(1)) : 0;

  return (
    <div className='px-4 py-8 sm:px-10'>
      <div className='mx-auto flex max-w-350 flex-col gap-6'>
        {/* Top Row */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* System Info Card */}
          <HostInfoCard
            hostname={info?.hostname}
            osVersion={info?.osVersion}
            kernel={info?.kernel}
            ipAddress={info?.ipAddress}
            uptime={info?.uptime ?? 0}
          />

          {/* CPU Gauge */}
          <CpuLoadInfoCard cpuUsage={cpu?.usage} />
          {/* Memory Donut */}
          <MemoryInfoCard
            total={memory?.total}
            used={memory?.used}
            cached={memory?.cached}
            usedPct={memUsedPct}
            cachedPct={memCachedPct}
          />
        </div>

        {/* Middle Row: CPU Core Bars */}
        <CpuUsageCard
          model={cpu?.model}
          coreCount={cpu?.cores.length}
          speed={cpu?.speed}
          cores={cpu?.cores}
        />

        {/* Bottom Row: Grid Metrics */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <NetworkInfoCard iface={net?.iface} rx={net?.rx} tx={net?.tx} />

          <StorageInfoCard
            mountPoint={disk?.mountPoint}
            label={disk?.label}
            readSpeed={disk?.readSpeed}
            writeSpeed={disk?.writeSpeed}
            used={disk?.used}
            total={disk?.total}
            usagePercent={disk?.usagePercent}
          />

          <CpuTempInfoCard temperature={cpu?.temperature} throttling={cpu?.throttling} />

          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
