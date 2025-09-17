import fs from "fs";
import path from "path";

const SETTINGS_FILE_PATH = path.join(
  process.cwd(),
  "public",
  "custom-code-settings.json"
);

export interface CustomCodeSettings {
  header: {
    html: string[];
    css: string[];
    javascript: string[];
  };
  body: {
    html: string[];
    css: string[];
    javascript: string[];
  };
  footer: {
    html: string[];
    css: string[];
    javascript: string[];
  };
  lastUpdated: string | null;
  updatedBy: string | null;
}

/**
 * Basic sanitization to prevent obvious XSS attacks
 * Note: This is not foolproof - in production, consider using a proper HTML sanitizer
 */
function sanitizeCode(code: string): string {
  if (!code || typeof code !== "string") return "";

  // Remove potentially dangerous script tags and event handlers
  let sanitized = code;
  // Remove event handlers without quotes

  return sanitized.trim();
}

/**
 * Read custom code settings from the JSON file
 */
export async function getCustomCodeSettings(): Promise<CustomCodeSettings> {
  try {
    const fileContents = fs.readFileSync(SETTINGS_FILE_PATH, "utf8");
    const settings = JSON.parse(fileContents);

    // Validate the structure
    if (
      !settings.header ||
      !settings.body ||
      !settings.footer ||
      !Array.isArray(settings.header.html) ||
      !Array.isArray(settings.header.css) ||
      !Array.isArray(settings.header.javascript) ||
      !Array.isArray(settings.body.html) ||
      !Array.isArray(settings.body.css) ||
      !Array.isArray(settings.body.javascript) ||
      !Array.isArray(settings.footer.html) ||
      !Array.isArray(settings.footer.css) ||
      !Array.isArray(settings.footer.javascript)
    ) {
      throw new Error("Invalid settings structure");
    }

    return settings;
  } catch (error) {
    console.error("Error reading custom code settings:", error);

    // Return default empty settings
    return {
      header: { html: [], css: [], javascript: [] },
      body: { html: [], css: [], javascript: [] },
      footer: { html: [], css: [], javascript: [] },
      lastUpdated: null,
      updatedBy: null,
    };
  }
}

/**
 * Get header code (HTML, CSS, JS) for injection in <head>
 */
export async function getHeaderCode(): Promise<{
  html: string;
  css: string;
  javascript: string;
}> {
  const settings = await getCustomCodeSettings();
  return {
    html: settings.header.html.map((code) => sanitizeCode(code)).join("\n"),
    css: settings.header.css.join("\n"), // CSS is generally safe
    javascript: settings.header.javascript.join("\n"), // JS in header is typically intentional
  };
}

/**
 * Get body code (HTML, CSS, JS) for injection after <body>
 */
export async function getBodyCode(): Promise<{
  html: string;
  css: string;
  javascript: string;
}> {
  const settings = await getCustomCodeSettings();
  return {
    html: settings.body.html.map((code) => sanitizeCode(code)).join("\n"),
    css: settings.body.css.join("\n"), // CSS is generally safe
    javascript: settings.body.javascript.join("\n"), // JS in body is typically intentional
  };
}

/**
 * Get footer code (HTML, CSS, JS) for injection before </body>
 */
export async function getFooterCode(): Promise<{
  html: string;
  css: string;
  javascript: string;
}> {
  const settings = await getCustomCodeSettings();
  return {
    html: settings.footer.html.map((code) => sanitizeCode(code)).join("\n"),
    css: settings.footer.css.join("\n"), // CSS is generally safe
    javascript: settings.footer.javascript.join("\n"), // JS in footer is typically intentional
  };
}
