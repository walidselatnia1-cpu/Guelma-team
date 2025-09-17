import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mime from "mime"; // npm install mime

export async function GET(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathParts } = await context.params; // ✅ await params
    const filePath = path.join(process.cwd(), "uploads", ...pathParts);

    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const mimeType = mime.getType(filePath) || "application/octet-stream";

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("File serving error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
