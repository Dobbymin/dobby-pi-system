export type FileEntry = {
  name: string;
  path: string;
  type: "file" | "directory" | "symlink";
  size: number;
  permissions: string;
  owner: string;
  group: string;
  modified: string;
  created: string;
  isHidden: boolean;
  mimeType?: string;
};

export type FileNavigationHistory = {
  path: string;
  index: number;
  history: string[];
};
