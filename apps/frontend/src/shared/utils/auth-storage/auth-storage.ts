type AuthStorageKey = {
  accessToken: string;
  refreshToken: string;
};

const initStorage = <T extends keyof AuthStorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): AuthStorageKey[T] => {
    const value = storage.getItem(storageKey);

    return value as AuthStorageKey[T];
  };

  const set = (value: AuthStorageKey[T]) => {
    if (value === undefined || value === null || value === "" || value === "undefined") {
      return storage.removeItem(storageKey);
    }

    storage.setItem(storageKey, String(value));
  };

  return { get, set };
};

export const authStorage = {
  accessToken: initStorage("accessToken", localStorage),
  refreshToken: initStorage("refreshToken", localStorage),
};
