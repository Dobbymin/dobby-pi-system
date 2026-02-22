export type StoragePartition = {
  device: string;
  mountPoint: string;
  fsType: string;
  total: number;
  used: number;
  free: number;
  usagePercent: number;
  inodeTotal?: number;
  inodeUsed?: number;
  inodeFree?: number;
  inodeUsagePercent?: number;
};

export type SmartInfo = {
  device: string;
  model: string;
  serial: string;
  firmwareVersion: string;
  healthStatus: "good" | "warning" | "bad";
  temperature: number;
  powerOnHours: number;
  reallocatedSectors: number;
};
