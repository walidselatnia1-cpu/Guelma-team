const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function migrateAdminSettings() {
  try {
    console.log("Starting migration of admin settings...");

    // Read existing JSON settings
    const settingsFilePath = path.join(
      process.cwd(),
      "public",
      "custom-code-settings.json"
    );

    let existingSettings = {};
    try {
      const fileContents = fs.readFileSync(settingsFilePath, "utf8");
      existingSettings = JSON.parse(fileContents);
      console.log("Found existing settings in JSON file");
    } catch (error) {
      console.log("No existing JSON settings file found, using defaults");
    }

    // Prepare settings for database
    const settings = [
      // Header settings
      {
        key: "header_html",
        value: JSON.stringify(existingSettings.header?.html || []),
      },
      {
        key: "header_css",
        value: JSON.stringify(existingSettings.header?.css || []),
      },
      {
        key: "header_javascript",
        value: JSON.stringify(existingSettings.header?.javascript || []),
      },

      // Body settings
      {
        key: "body_html",
        value: JSON.stringify(existingSettings.body?.html || []),
      },
      {
        key: "body_css",
        value: JSON.stringify(existingSettings.body?.css || []),
      },
      {
        key: "body_javascript",
        value: JSON.stringify(existingSettings.body?.javascript || []),
      },

      // Footer settings
      {
        key: "footer_html",
        value: JSON.stringify(existingSettings.footer?.html || []),
      },
      {
        key: "footer_css",
        value: JSON.stringify(existingSettings.footer?.css || []),
      },
      {
        key: "footer_javascript",
        value: JSON.stringify(existingSettings.footer?.javascript || []),
      },

      // File settings
      {
        key: "adsTxt",
        value:
          existingSettings.adsTxt ||
          "# ads.txt file\n# Add your authorized seller information here",
      },
      {
        key: "robotsTxt",
        value:
          existingSettings.robotsTxt ||
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
      },

      // Metadata
      {
        key: "lastUpdated",
        value: existingSettings.lastUpdated || new Date().toISOString(),
      },
      { key: "updatedBy", value: existingSettings.updatedBy || "migration" },
    ];

    console.log("Migrating settings to database...");

    // Insert all settings using transaction
    await prisma.$transaction(
      settings.map((setting) =>
        prisma.adminSettings.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value },
        })
      )
    );

    console.log("Migration completed successfully!");
    console.log(
      "You can now safely remove the public/custom-code-settings.json file"
    );
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateAdminSettings();
