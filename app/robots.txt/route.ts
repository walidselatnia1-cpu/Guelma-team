import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SETTINGS_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "custom-code-settings.json"
);

// Helper function to read settings
async function readSettings() {
  try {
    const fileContents = fs.readFileSync(SETTINGS_FILE_PATH, "utf8");
    const settings = JSON.parse(fileContents);
    return (
      settings.robotsTxt ||
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
Allow: /search

# Crawl delay (optional)
Crawl-delay: 1`
    );
  } catch (error) {
    console.error("Error reading settings:", error);
    return `User-agent: *
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
Allow: /search

# Crawl delay (optional)
Crawl-delay: 1`;
  }
}

export async function GET() {
  try {
    const robotsTxtContent = await readSettings();

    return new NextResponse(robotsTxtContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error in GET /robots.txt:", error);
    return new NextResponse("# Error loading robots.txt", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
