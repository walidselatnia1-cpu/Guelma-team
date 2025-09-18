import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  getAdminSettings,
  saveAdminSettings,
  AdminSettingsData,
} from "@/lib/admin-settings";

// GET - Retrieve current settings
export async function GET() {
  try {
    const settings = await getAdminSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/admin/settings:", error);
    return NextResponse.json(
      { error: "Failed to read settings" },
      { status: 500 }
    );
  }
}

// POST - Update settings
export async function POST(request: NextRequest) {
  try {
    // Check authentication (simplified - in production use proper JWT validation)
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate the structure
    const requiredSections = ["header", "body", "footer"];
    for (const section of requiredSections) {
      if (!body[section] || typeof body[section] !== "object") {
        return NextResponse.json(
          { error: `Invalid ${section} section` },
          { status: 400 }
        );
      }

      const requiredFields = ["html", "css", "javascript"];
      for (const field of requiredFields) {
        if (!Array.isArray(body[section][field])) {
          return NextResponse.json(
            { error: `Invalid ${section}.${field} field - must be an array` },
            { status: 400 }
          );
        }

        // Validate each item in the array is a string
        for (const item of body[section][field]) {
          if (typeof item !== "string") {
            return NextResponse.json(
              {
                error: `Invalid item in ${section}.${field} - must be a string`,
              },
              { status: 400 }
            );
          }
        }
      }
    }

    // Validate adsTxt and robotsTxt fields
    const textFields = ["adsTxt", "robotsTxt"];
    for (const field of textFields) {
      if (body[field] !== undefined && typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `Invalid ${field} field - must be a string` },
          { status: 400 }
        );
      }
    }

    // Read current settings and merge with updates
    const currentSettings = await getAdminSettings();
    const updatedSettings: AdminSettingsData = {
      ...currentSettings,
      ...body,
    };

    // Write updated settings
    const success = await saveAdminSettings(updatedSettings);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to save settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Error in POST /api/admin/settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Replace entire settings (alternative to POST)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate the structure
    const requiredSections = ["header", "body", "footer"];
    for (const section of requiredSections) {
      if (!body[section] || typeof body[section] !== "object") {
        return NextResponse.json(
          { error: `Invalid ${section} section` },
          { status: 400 }
        );
      }

      const requiredFields = ["html", "css", "javascript"];
      for (const field of requiredFields) {
        if (!Array.isArray(body[section][field])) {
          return NextResponse.json(
            { error: `Invalid ${section}.${field} field - must be an array` },
            { status: 400 }
          );
        }

        // Validate each item in the array is a string
        for (const item of body[section][field]) {
          if (typeof item !== "string") {
            return NextResponse.json(
              {
                error: `Invalid item in ${section}.${field} - must be a string`,
              },
              { status: 400 }
            );
          }
        }
      }
    }

    // Write settings (replace entirely)
    const success = await saveAdminSettings(body as AdminSettingsData);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to save settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings replaced successfully",
      settings: body,
    });
  } catch (error) {
    console.error("Error in PUT /api/admin/settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
