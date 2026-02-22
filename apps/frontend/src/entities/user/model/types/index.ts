export type SystemUser = {
  username: string;
  uid: number;
  gid: number;
  home: string;
  shell: string;
  groups: string[];
  status: "active" | "locked";
  sudo: boolean;
  lastLogin?: string;
};

export type Group = {
  name: string;
  gid: number;
  members: string[];
};

export type SshKey = {
  id: string;
  type: string;
  fingerprint: string;
  comment: string;
  addedAt: string;
};
