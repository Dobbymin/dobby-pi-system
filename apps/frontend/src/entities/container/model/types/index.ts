export type ContainerPort = {
  privatePort: number;
  publicPort?: number;
  protocol: "tcp" | "udp";
};

export type DockerContainer = {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "paused" | "exited" | "restarting";
  cpuPercent: number;
  memUsed: number;
  memLimit: number;
  ports: ContainerPort[];
  created: string;
  networkMode: string;
};

export type DockerImage = {
  id: string;
  repository: string;
  tag: string;
  size: number;
  created: string;
};

export type DockerVolume = {
  name: string;
  driver: string;
  mountPoint: string;
  scope: string;
  created: string;
};

export type DockerNetwork = {
  id: string;
  name: string;
  driver: string;
  subnet: string;
  gateway: string;
  containers: string[];
};

export type DockerInfo = {
  version: string;
  containers: number;
  running: number;
  stopped: number;
  images: number;
  volumes: number;
};
