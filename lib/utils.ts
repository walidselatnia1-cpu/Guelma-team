import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the current hostname for dynamic URL construction
 * Works on both client and server side
 */
export function getHostname(): string {
  // Client-side: use window.location
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }

  // Server-side: try to get from environment or use localhost as fallback
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname;
  }

  // Fallback for development
  return "localhost:3000";
}

/**
 * Get the current protocol (http/https)
 */
export function getProtocol(): string {
  if (typeof window !== "undefined") {
    return window.location.protocol;
  }

  // Default to https for production
  return process.env.NODE_ENV === "production" ? "https:" : "http:";
}

/**
 * Construct a full URL with the current hostname
 */
export function getFullUrl(path: string = ""): string {
  const protocol = getProtocol();
  const hostname = getHostname();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${protocol}//${hostname}${cleanPath}`;
}
