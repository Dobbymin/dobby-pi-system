import { Cell, Pie, PieChart } from "recharts";

import { Card, type ChartConfig, ChartContainer } from "@/shared";

import { formatGB } from "../../utils";

type Props = {
  total?: number;
  used?: number;
  cached?: number;
  usedPct: number;
  cachedPct: number;
};

const chartConfig = {
  used: {
    label: "Used",
    color: "var(--color-primary)",
  },
  cached: {
    label: "Cached",
    color: "#a855f7",
  },
  free: {
    label: "Free",
    color: "var(--color-slate-100)",
  },
} satisfies ChartConfig;

export const MemoryInfoCard = ({ total, used, cached, usedPct, cachedPct }: Props) => {
  const freePct = Math.max(0, 100 - usedPct - cachedPct);

  const chartData = [
    { name: "used", value: usedPct },
    { name: "cached", value: cachedPct },
    { name: "free", value: freePct },
  ];

  const COLORS = [chartConfig.used.color, chartConfig.cached.color, "var(--color-slate-100)"];

  return (
    <Card className='relative flex flex-col items-center justify-center lg:col-span-4'>
      <h3 className='absolute left-6 top-6 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400'>
        Memory
      </h3>
      <div className='relative mt-4 size-40'>
        <ChartContainer config={chartConfig} className='size-full'>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={52}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              dataKey='value'
              strokeWidth={0}
              isAnimationActive={true}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
          <span className='block text-3xl font-bold text-slate-900 dark:text-white'>
            {used !== undefined ? formatGB(used) : "—"}
            <span className='ml-1 text-sm text-slate-500'>GB</span>
          </span>
          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>Used</span>
        </div>
      </div>
      <div className='mt-4 flex w-full justify-around px-4 text-xs'>
        <div className='text-center'>
          <div className='font-bold text-slate-900 dark:text-white'>
            {total !== undefined ? `${formatGB(total)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Total</span>
        </div>
        <div className='text-center'>
          <div className='font-bold text-primary'>
            {used !== undefined ? `${formatGB(used)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Used</span>
        </div>
        <div className='text-center'>
          <div className='font-bold text-purple-500'>
            {cached !== undefined ? `${formatGB(cached)}GB` : "—"}
          </div>
          <span className='text-slate-500 dark:text-slate-400'>Cached</span>
        </div>
      </div>
    </Card>
  );
};
