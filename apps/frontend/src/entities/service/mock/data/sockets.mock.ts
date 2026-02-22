import type { Socket } from "../../model";

export const mockSockets: Socket[] = [
  {
    name: "docker.socket",
    description: "Docker Socket for the API",
    status: "active",
    listenAddress: "/run/docker.sock",
  },
  {
    name: "sshd.socket",
    description: "OpenSSH Server Socket",
    status: "active",
    listenAddress: "0.0.0.0:22",
  },
  {
    name: "systemd-journald.socket",
    description: "Journal Socket",
    status: "active",
    listenAddress: "/run/systemd/journal/socket",
  },
  {
    name: "cups.socket",
    description: "CUPS Scheduler",
    status: "inactive",
    listenAddress: "/run/cups/cups.sock",
  },
];
