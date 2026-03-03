import { useStoragePartitions } from "@/entities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";

import { LoadingPartitionList, PartitionTable } from "../../components";

export const PartitionListCard = () => {
  const { data: partitionsResponse, isLoading } = useStoragePartitions();
  const partitions = partitionsResponse?.data;

  if (isLoading) {
    return <LoadingPartitionList />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partitions &amp; Volumes</CardTitle>
        <CardDescription>Detailed view of all mounted filesystems</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <PartitionTable partitions={partitions} />
        </div>
      </CardContent>
    </Card>
  );
};
