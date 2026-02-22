import { Terminal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/shared/components/ui";

import { useServiceLogsQuery } from "../../hooks";

type Props = {
  open: boolean;
  name: string;
  onClose: () => void;
};

export function ServiceLogsDialog({ open, name, onClose }: Props) {
  const { data, isLoading } = useServiceLogsQuery(name, 100, open);
  const logs = data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Terminal className='size-4 text-primary' />
            <span className='font-mono'>{name}</span>
            <span className='font-normal text-slate-400'>— 로그</span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-105 rounded-lg border border-slate-800 bg-slate-950 p-4'>
          {isLoading ? (
            <p className='text-xs text-slate-500'>로딩 중...</p>
          ) : logs.length === 0 ? (
            <p className='text-xs text-slate-500'>로그가 없습니다.</p>
          ) : (
            <div className='space-y-0.5 font-mono text-xs leading-relaxed text-slate-300'>
              {logs.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
