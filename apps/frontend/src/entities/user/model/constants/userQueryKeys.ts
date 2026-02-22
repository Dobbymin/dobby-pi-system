export const userQueryKeys = {
  all: ["users"] as const,
  list: () => [...userQueryKeys.all, "list"] as const,
  groups: () => [...userQueryKeys.all, "groups"] as const,
  sshKeys: (username: string) => [...userQueryKeys.all, "sshKeys", username] as const,
};
