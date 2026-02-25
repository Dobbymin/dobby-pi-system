import { RadialBar, RadialBarChart } from "recharts";

import { Card, type ChartConfig, ChartContainer } from "@/shared";

type Props = {
  cpuUsage?: number;
};

const chartConfig = {
  load: {
    label: "CPU Load",
    color: "var(--color-cyan-500)",
  },
  track: {
    label: "Track",
    color: "var(--color-slate-100)",
  },
} satisfies ChartConfig;

export const CpuLoadInfoCard = ({ cpuUsage }: Props) => {
  const value = cpuUsage ?? 0;

  const chartData = [
    { name: "track", value: 100, fill: "var(--color-track)" },
    { name: "load", value, fill: "var(--color-load)" },
  ];

  return (
    <Card className='relative flex flex-col items-center justify-center lg:col-span-4'>
      <h3 className='absolute left-6 top-6 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
        CPU Load
      </h3>
      <div className='relative mt-4 size-40'>
        <ChartContainer config={chartConfig} className='size-full'>
          <RadialBarChart
            data={chartData}
            innerRadius={52}
            outerRadius={72}
            startAngle={90}
            endAngle={-270}
            barSize={12}
          >
            <RadialBar dataKey='value' background={false} isAnimationActive={true} />
          </RadialBarChart>
        </ChartContainer>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
          <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
            {cpuUsage !== undefined ? `${cpuUsage}%` : "—"}
          </span>
          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Avg Load</span>
        </div>
      </div>
      <div className='mt-4 flex gap-4 text-xs'>
        <div className='flex items-center gap-1'>
          <div className='size-2 rounded-full bg-cyan-500' />
          <span className='text-slate-500 dark:text-slate-400'>User</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='size-2 rounded-full bg-blue-500' />
          <span className='text-slate-500 dark:text-slate-400'>System</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='size-2 rounded-full bg-slate-700 dark:bg-slate-300' />
          <span className='text-slate-500 dark:text-slate-400'>Idle</span>
        </div>
      </div>
    </Card>
  );
};
