import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";

import { DiskUsageOverviewSkeleton } from "../../common";

export const LoadingDiskUsageOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disk Usage Overview</CardTitle>
        <CardDescription>Loading storage data...</CardDescription>
      </CardHeader>
      <CardContent className='flex h-65 items-center justify-center'>
        <DiskUsageOverviewSkeleton />
      </CardContent>
    </Card>
  );
};
