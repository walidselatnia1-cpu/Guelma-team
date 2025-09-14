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
      settings.adsTxt ||
      "# ads.txt file\n# Add your authorized seller information here"
    );
  } catch (error) {
    console.error("Error reading settings:", error);
    return "# ads.txt file\n# Add your authorized seller information here";
  }
}

export async function GET() {
  try {
    const adsTxtContent = await readSettings();

    return new NextResponse(adsTxtContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error in GET /ads.txt:", error);
    return new NextResponse("# Error loading ads.txt", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
