import type { StoragePartition } from "@/entities";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  formatBytes,
} from "@/shared";

import { UsageCell } from "../../common";

type PartitionTableProps = {
  partitions?: StoragePartition[];
};

export const PartitionTable = ({ partitions }: PartitionTableProps) => {
  if (!partitions || partitions.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className='text-muted-foreground h-24 text-center'>
          No partition data available
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mount Point</TableHead>
          <TableHead>Filesystem</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className='w-[30%]'>Usage</TableHead>
          <TableHead className='text-right'>Free / Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partitions?.map((partition, i) => (
          <TableRow key={`${partition.mountPoint}-${i}`}>
            <TableCell className='font-medium'>
              {partition.mountPoint}
              {partition.mountPoint === "/" && (
                <Badge variant='outline' className='ml-2 h-5 text-[10px]'>
                  Root
                </Badge>
              )}
            </TableCell>
            <TableCell className='text-muted-foreground'>{partition.device}</TableCell>
            <TableCell>
              <Badge variant='secondary' className='font-mono text-xs'>
                {partition.fsType}
              </Badge>
            </TableCell>
            <TableCell>
              <UsageCell used={partition.used} usagePercent={partition.usagePercent} />
            </TableCell>
            <TableCell className='text-right text-sm'>
              <span className='font-medium'>{formatBytes(partition.free)}</span>
              <span className='text-muted-foreground'> / {formatBytes(partition.total)}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
