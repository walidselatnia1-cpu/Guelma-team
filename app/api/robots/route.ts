export const dynamic = "force-dynamic";
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
    return settings.robotsTxt;
  } catch (error) {
    console.error("Error reading settings:", error);
    return null;
  }
}

export async function GET() {
  try {
    const robotsTxtContent = await readSettings();

    return new NextResponse(robotsTxtContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
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
