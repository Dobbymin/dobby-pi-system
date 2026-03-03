export const getUsageColor = (percent: number) => {
  if (percent > 90) return "text-destructive";
  if (percent > 80) return "text-amber-500";
  return "";
};

export const getProgressColor = (percent: number) => {
  if (percent > 90) return "[&>div]:bg-destructive";
  if (percent > 80) return "[&>div]:bg-amber-500";
  return "";
};
