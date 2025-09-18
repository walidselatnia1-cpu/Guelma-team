import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface AdminSettingsData {
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
  adsTxt: string;
  robotsTxt: string;
  lastUpdated: string | null;
  updatedBy: string | null;
}

export async function getAdminSettings(): Promise<AdminSettingsData> {
  try {
    const settings = await prisma.adminSettings.findMany();

    // Convert database records to structured object
    const settingsMap = new Map(
      settings.map((setting) => [setting.key, setting.value])
    );

    return {
      header: {
        html: JSON.parse(settingsMap.get("header_html") || "[]"),
        css: JSON.parse(settingsMap.get("header_css") || "[]"),
        javascript: JSON.parse(settingsMap.get("header_javascript") || "[]"),
      },
      body: {
        html: JSON.parse(settingsMap.get("body_html") || "[]"),
        css: JSON.parse(settingsMap.get("body_css") || "[]"),
        javascript: JSON.parse(settingsMap.get("body_javascript") || "[]"),
      },
      footer: {
        html: JSON.parse(settingsMap.get("footer_html") || "[]"),
        css: JSON.parse(settingsMap.get("footer_css") || "[]"),
        javascript: JSON.parse(settingsMap.get("footer_javascript") || "[]"),
      },
      adsTxt:
        settingsMap.get("adsTxt") ||
        "# ads.txt file\n# Add your authorized seller information here",
      robotsTxt:
        settingsMap.get("robotsTxt") ||
        `User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow search engines to crawl everything else
Allow: /recipes/
Allow: /categories/
Allow: /about
Allow: /contact
Allow: /faq
Allow: /explore
Allow: /search`,
      lastUpdated: settingsMap.get("lastUpdated") || null,
      updatedBy: settingsMap.get("updatedBy") || null,
    };
  } catch (error) {
    console.error("Error reading admin settings:", error);
    // Return default settings
    return {
      header: { html: [], css: [], javascript: [] },
      body: { html: [], css: [], javascript: [] },
      footer: { html: [], css: [], javascript: [] },
      adsTxt: "# ads.txt file\n# Add your authorized seller information here",
      robotsTxt: `User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow search engines to crawl everything else
Allow: /recipes/
Allow: /categories/
Allow: /about
Allow: /contact
Allow: /faq
Allow: /explore
Allow: /search`,
      lastUpdated: null,
      updatedBy: null,
    };
  }
}

export async function saveAdminSettings(
  settings: AdminSettingsData,
  updatedBy?: string
): Promise<boolean> {
  try {
    const updates = [
      { key: "header_html", value: JSON.stringify(settings.header.html) },
      { key: "header_css", value: JSON.stringify(settings.header.css) },
      {
        key: "header_javascript",
        value: JSON.stringify(settings.header.javascript),
      },
      { key: "body_html", value: JSON.stringify(settings.body.html) },
      { key: "body_css", value: JSON.stringify(settings.body.css) },
      {
        key: "body_javascript",
        value: JSON.stringify(settings.body.javascript),
      },
      { key: "footer_html", value: JSON.stringify(settings.footer.html) },
      { key: "footer_css", value: JSON.stringify(settings.footer.css) },
      {
        key: "footer_javascript",
        value: JSON.stringify(settings.footer.javascript),
      },
      { key: "adsTxt", value: settings.adsTxt },
      { key: "robotsTxt", value: settings.robotsTxt },
      { key: "lastUpdated", value: new Date().toISOString() },
      { key: "updatedBy", value: updatedBy || "admin" },
    ];

    // Use transaction to update all settings atomically
    await prisma.$transaction(
      updates.map((update) =>
        prisma.adminSettings.upsert({
          where: { key: update.key },
          update: { value: update.value },
          create: { key: update.key, value: update.value },
        })
      )
    );

    return true;
  } catch (error) {
    console.error("Error saving admin settings:", error);
    return false;
  }
}

export async function getSettingValue(key: string): Promise<string | null> {
  try {
    const setting = await prisma.adminSettings.findUnique({
      where: { key },
    });
    return setting?.value || null;
  } catch (error) {
    console.error(`Error reading setting ${key}:`, error);
    return null;
  }
}
