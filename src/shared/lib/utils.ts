import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { AES, enc } from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decryptPassword(encryptedPassword: string): string {
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY ?? "";
  const bytes = AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(enc.Utf8);
}
