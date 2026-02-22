import { useCallback, useEffect, useState } from "react";

import { userApi } from "@/entities/user";
import type { Group, SystemUser } from "@/entities/user";

export function useUserList() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const [usersRes, groupsRes] = await Promise.all([userApi.getAll(), userApi.getGroups()]);
      setUsers(usersRes.data);
      setGroups(groupsRes.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { users, groups, isLoading, refresh: fetch };
}
