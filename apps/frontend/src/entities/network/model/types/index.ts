export type FirewallRule = {
  id: string;
  port: number;
  protocol: "tcp" | "udp" | "any";
  source: string;
  action: "allow" | "deny";
  enabled: boolean;
  description?: string;
};

export type NetworkConnection = {
  protocol: "tcp" | "udp";
  localAddress: string;
  localPort: number;
  remoteAddress?: string;
  remotePort?: number;
  state: "ESTABLISHED" | "LISTEN" | "TIME_WAIT" | "CLOSE_WAIT" | "SYN_SENT";
  pid?: number;
  process?: string;
};
