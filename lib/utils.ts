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
  if ((process.env as any)["VERCEL_URL"]) {
    return (process.env as any)["VERCEL_URL"];
  }

  if ((process.env as any)["NEXT_PUBLIC_SITE_URL"]) {
    return new URL((process.env as any)["NEXT_PUBLIC_SITE_URL"]).hostname;
  }

  // Fallback for development
  return "flavorfable.com";
}

/**
 * Get the current protocol (http/https)
 */
export function getProtocol(): string {
  if (typeof window !== "undefined") {
    return window.location.protocol;
  }

  // Default to https for production
  return (process.env as any).NODE_ENV === "production" ? "https:" : "http:";
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

/**
 * Safe HTML renderer that sanitizes and processes HTML content
 * Handles internal links and basic HTML elements
 */
export function renderSafeHtml(htmlContent: string): { __html: string } {
  if (!htmlContent || typeof htmlContent !== "string") {
    return { __html: "" };
  }

  // Basic HTML sanitization - remove dangerous tags and attributes
  let sanitized = htmlContent
    // Remove script tags and their content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    // Remove style tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    // Remove event handlers
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    // Remove javascript: URLs
    .replace(/javascript:[^"']*/gi, "#")
    // Remove dangerous tags
    .replace(
      /<(iframe|object|embed|form|input|textarea|select|button)[^>]*>[\s\S]*?<\/\1>/gi,
      ""
    )
    .replace(
      /<(iframe|object|embed|form|input|textarea|select|button)[^>]*\/?>/gi,
      ""
    );

  // Process internal links - convert relative URLs to absolute
  sanitized = sanitized.replace(
    /href=(["'])([^"']*)\1/gi,
    (match, quote, url) => {
      if (
        url.startsWith("http") ||
        url.startsWith("//") ||
        url.startsWith("mailto:") ||
        url.startsWith("#")
      ) {
        return match; // Keep external URLs, mailto, and anchors as-is
      }
      // Convert relative URLs to absolute
      const absoluteUrl = url.startsWith("/")
        ? getFullUrl(url)
        : getFullUrl(`/${url}`);
      return `href="${absoluteUrl}"`;
    }
  );

  return { __html: sanitized };
}

/**
 * Check if content contains HTML tags
 */
export function hasHtmlTags(content: string): boolean {
  if (!content || typeof content !== "string") {
    return false;
  }
  return /<[^>]+>/.test(content);
}
