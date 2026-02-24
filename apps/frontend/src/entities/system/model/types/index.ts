import type { NetworkInterface } from "@/shared/types";

export type { NetworkInterface };

export type CpuInfo = {
  usage: number;
  cores: number[];
  temperature: number;
  model: string;
  speed: number;
  throttling: boolean;
};

export type MemoryInfo = {
  total: number;
  used: number;
  free: number;
  cached: number;
  buffers: number;
  usagePercent: number;
};

export type DiskInfo = {
  device: string;
  mountPoint: string;
  fsType: string;
  label?: string;
  total: number;
  used: number;
  free: number;
  usagePercent: number;
  readSpeed?: number;
  writeSpeed?: number;
};

export type SystemInfo = {
  hostname: string;
  osVersion: string;
  kernel: string;
  arch: string;
  uptime: number;
  platform: string;
  distro: string;
  connectedUsers: number;
  ipAddress?: string;
};

export type SystemMetrics = {
  cpu: CpuInfo;
  memory: MemoryInfo;
  disks: DiskInfo[];
  network: NetworkInterface[];
  timestamp: number;
};
