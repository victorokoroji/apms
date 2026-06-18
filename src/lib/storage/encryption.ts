const getEncryptionKey = (): string => {
  const keyMaterial = process.env.NEXT_PUBLIC_STORAGE_SECRET;

  if (!keyMaterial) {
    console.warn(
      "⚠️ Missing NEXT_PUBLIC_STORAGE_SECRET. Using fallback secret (not recommended for production).",
    );
  }

  return keyMaterial || "default_fallback_secret_that_is_32_chars";
};

// Simple XOR cipher with base64 encoding
const xorCipher = (text: string, key: string): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  }
  return result;
};

export function encryptValue<T>(value: T): string {
  try {
    const serialized = JSON.stringify(value);
    const key = getEncryptionKey();

    // XOR + base64 for obfuscation
    const xored = xorCipher(serialized, key);
    const base64 = btoa(xored);

    // Add some random padding to make it less obvious
    const padding = Math.random().toString(36).substring(2, 8);
    return `${padding}.${base64}.${padding.split("").reverse().join("")}`;
  } catch (error) {
    throw new Error(`Encryption failed: ${error}`);
  }
}

export function decryptValue<T>(encryptedValue: string): T | null {
  try {
    // Remove padding
    const parts = encryptedValue.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid encrypted format");
    }

    const base64 = parts[1];
    const xored = atob(base64);

    const key = getEncryptionKey();
    const decrypted = xorCipher(xored, key);

    return JSON.parse(decrypted) as T;
  } catch (error) {
    console.debug("Decryption failed:", error);
    return null;
  }
}
