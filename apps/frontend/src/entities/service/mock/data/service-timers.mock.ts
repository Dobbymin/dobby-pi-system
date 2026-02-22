import type { Timer } from "../../model";

export const SERVICE_TIMER_MOCK_DATA: Timer[] = [
  {
    name: "apt-daily.timer",
    description: "Daily apt download activities",
    lastTrigger: "2024-01-15T06:00:00Z",
    nextTrigger: "2024-01-16T06:32:00Z",
    status: "active",
  },
  {
    name: "apt-daily-upgrade.timer",
    description: "Daily apt upgrade and clean activities",
    lastTrigger: "2024-01-15T06:15:00Z",
    nextTrigger: "2024-01-16T06:15:00Z",
    status: "active",
  },
  {
    name: "logrotate.timer",
    description: "Daily rotation of log files",
    lastTrigger: "2024-01-15T00:00:00Z",
    nextTrigger: "2024-01-16T00:00:00Z",
    status: "active",
  },
  {
    name: "backup.timer",
    description: "Weekly system backup",
    lastTrigger: "2024-01-14T02:00:00Z",
    nextTrigger: "2024-01-21T02:00:00Z",
    status: "inactive",
  },
];
