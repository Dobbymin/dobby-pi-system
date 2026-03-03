import { AlertTriangle, CheckCircle2, Clock, Thermometer } from "lucide-react";

import { Badge } from "@/shared";

type Props = {
  healthStatus: "good" | "warning" | "bad";
  model: string;
  device: string;
  powerOnHours: number;
  temperature: number;
  reallocatedSectors: number;
};

export const SmartInfoBox = ({
  healthStatus,
  model,
  device,
  powerOnHours,
  temperature,
  reallocatedSectors,
}: Props) => {
  const isGood = healthStatus === "good";
  const isWarning = healthStatus === "warning";

  return (
    <div key={healthStatus} className='space-y-3 rounded-lg border p-4'>
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold'>{model}</p>
          <p className='text-muted-foreground text-xs'>{device}</p>
        </div>
        <Badge
          variant={isGood ? "default" : isWarning ? "outline" : "destructive"}
          className={`shrink-0 ${isGood ? "bg-chart-2 hover:bg-chart-2 text-white" : isWarning ? "border-amber-500 text-amber-500" : ""}`}
        >
          {isGood ? (
            <CheckCircle2 className='mr-1 size-3' />
          ) : (
            <AlertTriangle className='mr-1 size-3' />
          )}
          {healthStatus.toUpperCase()}
        </Badge>
      </div>

      <div className='grid grid-cols-2 gap-2 text-xs'>
        <div className='text-muted-foreground flex items-center gap-1'>
          <Thermometer className='size-3' />
          <span>{temperature}°C</span>
        </div>
        <div className='text-muted-foreground flex items-center gap-1'>
          <Clock className='size-3' />
          <span>{powerOnHours.toLocaleString()}h</span>
        </div>
      </div>

      {reallocatedSectors > 0 && (
        <p className='text-xs text-amber-500'>⚠ Reallocated sectors: {reallocatedSectors}</p>
      )}
    </div>
  );
};
