import { useMemo } from "react";

import { HardDrive } from "lucide-react";
import { Cell, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

import { useStoragePartitions } from "@/entities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, formatBytes } from "@/shared";

import { LoadingDiskUsageOverview } from "../../components";

export const DiskUsageOverviewCard = () => {
  const { data: partitionsResponse, isLoading } = useStoragePartitions();
  const partitions = partitionsResponse?.data;

  const overviewData = useMemo(() => {
    if (!partitions || partitions.length === 0) {
      return { total: 0, used: 0, free: 0, percent: 0 };
    }

    // Pick the most relevant partition, usually root "/"
    const rootPartition = partitions.find((p) => p.mountPoint === "/") || partitions[0];

    return {
      total: rootPartition.total,
      used: rootPartition.used,
      free: rootPartition.free,
      percent: rootPartition.usagePercent,
    };
  }, [partitions]);

  const chartData = [
    { name: "Used", value: overviewData.used, color: "var(--destructive)" },
    { name: "Free", value: overviewData.free, color: "var(--chart-2)" },
  ];

  if (isLoading) {
    return <LoadingDiskUsageOverview />;
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <CardTitle>Disk Usage Overview</CardTitle>
          <CardDescription>Primary storage capacity</CardDescription>
        </div>
        <HardDrive className='text-muted-foreground size-4' />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:justify-start'>
          <div className='h-61 w-full md:w-50'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={chartData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey='value'
                  stroke='none'
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => formatBytes(value)}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--foreground)",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-4 flex w-full flex-col gap-4 md:mt-0 md:w-auto'>
            <div>
              <p className='text-muted-foreground text-sm font-medium'>Total Capacity</p>
              <p className='text-2xl font-bold tracking-tight'>{formatBytes(overviewData.total)}</p>
            </div>
            <div className='flex gap-4'>
              <div>
                <p className='text-muted-foreground flex items-center gap-2 text-sm font-medium'>
                  <span className='bg-destructive inline-block size-3 rounded-full'></span>
                  Used ({overviewData.percent.toFixed(1)}%)
                </p>
                <p className='text-lg font-bold'>{formatBytes(overviewData.used)}</p>
              </div>
              <div>
                <p className='text-muted-foreground flex items-center gap-2 text-sm font-medium'>
                  <span className='bg-chart-2 inline-block size-3 rounded-full'></span>
                  Free
                </p>
                <p className='text-lg font-bold'>{formatBytes(overviewData.free)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
