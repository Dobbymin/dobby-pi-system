export type Process = {
  pid: number;
  name: string;
  command: string;
  user: string;
  cpuPercent: number;
  memPercent: number;
  memUsed: number;
  status: "running" | "sleeping" | "stopped" | "zombie";
  startTime: string;
};

export type ProcessFilter = {
  search?: string;
  user?: string;
  minCpu?: number;
  minMem?: number;
};
