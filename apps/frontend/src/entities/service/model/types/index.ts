export type ServiceStatus = "active" | "inactive" | "failed" | "activating" | "deactivating";
export type ServiceEnabled = "enabled" | "disabled" | "static" | "masked";

export type Service = {
  name: string;
  description: string;
  status: ServiceStatus;
  enabled: ServiceEnabled;
  pid?: number;
  since?: string;
  memory?: number;
};

export type Timer = {
  name: string;
  description: string;
  lastTrigger: string;
  nextTrigger: string;
  status: ServiceStatus;
};

export type Socket = {
  name: string;
  description: string;
  status: ServiceStatus;
  listenAddress: string;
};
