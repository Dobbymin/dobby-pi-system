import { Loader2 } from "lucide-react";

import type { Socket } from "@/entities/service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";

import { ServiceStatusBadge } from "./ServiceStatusBadge";

type Props = {
  sockets: Socket[];
  isLoading: boolean;
  search: string;
};

export function SocketTable({ sockets, isLoading, search }: Props) {
  const filtered = sockets.filter(
    (s) =>
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className='flex h-48 items-center justify-center text-slate-400'>
        <Loader2 className='mr-2 size-5 animate-spin' />
        <span className='text-sm'>로딩 중...</span>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/30'>
          <TableHead className='w-1/4 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            소켓명
          </TableHead>
          <TableHead className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            설명
          </TableHead>
          <TableHead className='w-56 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            리슨 주소
          </TableHead>
          <TableHead className='w-32 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
            상태
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className='h-32 text-center text-sm text-slate-400'>
              소켓이 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          filtered.map((socket) => (
            <TableRow
              key={socket.name}
              className='group border-slate-100 transition-colors dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30'
            >
              <TableCell className='px-6 py-4 font-medium text-slate-900 dark:text-white'>
                {socket.name}
              </TableCell>
              <TableCell className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
                {socket.description}
              </TableCell>
              <TableCell className='px-6 py-4 font-mono text-sm text-slate-500 dark:text-slate-400'>
                {socket.listenAddress}
              </TableCell>
              <TableCell className='px-6 py-4'>
                <ServiceStatusBadge status={socket.status} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
