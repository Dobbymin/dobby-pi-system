import { Card } from "@/shared";

type Props = {
  model?: string;
  coreCount?: number;
  speed?: number;
  cores?: number[];
};

export const CpuUsageCard = ({ model, coreCount, speed, cores }: Props) => {
  const coreValues = cores ?? [0, 0, 0, 0];
  const colors = ["bg-cyan-400", "bg-purple-400", "bg-emerald-400", "bg-amber-400"];

  return (
    <Card>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h3 className='text-lg font-bold text-slate-900 dark:text-white'>Real-time CPU Usage</h3>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            {model ?? "Cortex-A72"} · {coreCount ?? 4} cores · {speed ?? "—"} MHz
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          {coreValues.map((usage, i) => (
            <div
              key={i}
              className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800'
            >
              <div className={`size-2 rounded-full ${colors[i]}`} />
              <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
                Core {i} · {usage}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='space-y-3'>
        {coreValues.map((usage, i) => (
          <div key={i} className='flex items-center gap-3'>
            <span className='w-12 text-right font-mono text-xs text-slate-500 dark:text-slate-400'>
              Core {i}
            </span>
            <div
              className='flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800'
              style={{ height: "8px" }}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${colors[i]}`}
                style={{ width: `${usage}%` }}
              />
            </div>
            <span className='w-10 font-mono text-xs text-slate-700 dark:text-slate-300'>
              {usage}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
