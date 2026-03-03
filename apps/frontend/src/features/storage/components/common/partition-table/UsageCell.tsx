import { Progress, formatBytes } from "@/shared";

import { getProgressColor, getUsageColor } from "../../../utils";

type UsageCellProps = {
  used: number;
  usagePercent: number;
};

export const UsageCell = ({ used, usagePercent }: UsageCellProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between text-xs'>
        <span className='text-muted-foreground'>{formatBytes(used)} used</span>
        <span className={`font-medium ${getUsageColor(usagePercent)}`}>
          {usagePercent.toFixed(1)}%
        </span>
      </div>
      <Progress value={usagePercent} className={`h-2 ${getProgressColor(usagePercent)}`} />
    </div>
  );
};
