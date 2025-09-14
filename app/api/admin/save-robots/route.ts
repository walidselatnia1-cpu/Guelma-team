import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ROBOTS_FILE_PATH = path.join(process.cwd(), "public", "robots.txt");

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 }
      );
    }

    // Write content to robots.txt file
    fs.writeFileSync(ROBOTS_FILE_PATH, content, "utf8");

    return NextResponse.json({
      success: true,
      message: "Robots.txt saved successfully",
    });
  } catch (error) {
    console.error("Error saving robots.txt:", error);
    return NextResponse.json(
      { error: "Failed to save robots.txt" },
      { status: 500 }
    );
  }
}
