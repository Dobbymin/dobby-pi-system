export type NetworkInterface = {
  name?: string;
  iface?: string;
  ipv4?: string;
  ip4?: string;
  ipv6?: string;
  mac: string;
  status?: "up" | "down";
  type?: string;
  rx: number;
  tx: number;
  rxSec?: number;
  txSec?: number;
  speed: number;
};
