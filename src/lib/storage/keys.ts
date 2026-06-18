export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_INFO: "user_info",
  VERIFY_EMAIL: "verify_email",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
export type StorageValue = (typeof STORAGE_KEYS)[StorageKey];
