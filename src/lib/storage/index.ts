import { decryptValue, encryptValue } from "./encryption";
import { STORAGE_KEYS, type StorageKey, type StorageValue } from "./keys";

const SALT = "echez_namespace@2025";
const APP_PREFIX = "__app__";

const hashKey = (key: string) => {
  let hash = 538123049843498;
  const input = key + SALT;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return `${APP_PREFIX}${(hash >>> 0).toString(16)}`;
};

const getKeyValue = (key: StorageKey | StorageValue): string => {
  if (Object.values(STORAGE_KEYS).includes(key as StorageValue)) {
    return key as string;
  }
  return STORAGE_KEYS[key as StorageKey];
};

export const storage = {
  setItem<T>(key: StorageKey | StorageValue, value: T): void {
    if (typeof window === "undefined") return;

    try {
      const keyValue = getKeyValue(key);
      const hashedKey = hashKey(keyValue);
      const encrypted = encryptValue(value);
      localStorage.setItem(hashedKey, encrypted);
    } catch (error) {
      console.error(`Error setting localStorage key: ${key}`, error);
    }
  },

  getItem<T>(key: StorageKey | StorageValue): T | null {
    if (typeof window === "undefined") return null;

    try {
      const keyValue = getKeyValue(key);
      const hashedKey = hashKey(keyValue);
      const encryptedValue = localStorage.getItem(hashedKey);

      if (!encryptedValue) return null;

      const decrypted = decryptValue<T>(encryptedValue);
      return decrypted;
    } catch (error) {
      console.error(`Error getting encrypted localStorage key: ${key}`, error);
      return null;
    }
  },

  removeItem(key: StorageKey | StorageValue): void {
    if (typeof window === "undefined") return;

    try {
      const keyValue = getKeyValue(key);
      const hashedKey = hashKey(keyValue);
      localStorage.removeItem(hashedKey);
    } catch (error) {
      console.error(`Error removing localStorage key: ${key}`, error);
    }
  },

  clearAll() {
    try {
      Object.keys(STORAGE_KEYS).forEach((k) => {
        const keyValue = STORAGE_KEYS[k as StorageKey];
        const hashedKey = hashKey(keyValue);
        localStorage.removeItem(hashedKey);
      });
    } catch (error) {
      console.error("Error clearing app storage", error);
    }
  },
};
