export type NetworkInterface = {
  name: string;
  ipv4: string;
  ipv6: string;
  mac: string;
  status: "up" | "down";
  rx: number;
  tx: number;
  rxSec: number;
  txSec: number;
  speed: number;
};
