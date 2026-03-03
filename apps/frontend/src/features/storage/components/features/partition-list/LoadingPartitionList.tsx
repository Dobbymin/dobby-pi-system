import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";

import { PartitionListSkeleton } from "../../common";

export const LoadingPartitionList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partitions &amp; Volumes</CardTitle>
        <CardDescription>Loading partition data...</CardDescription>
      </CardHeader>
      <CardContent>
        <PartitionListSkeleton />
      </CardContent>
    </Card>
  );
};
