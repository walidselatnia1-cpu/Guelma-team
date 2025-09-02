import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, unlink, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Next.js configuration for API route
export const dynamic = "force-dynamic";

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Generate unique filename
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const ext = path.extname(originalName);
  return `${timestamp}-${random}${ext}`;
}

// Validate file
function validateFile(file: File): { isValid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { isValid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir();

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate filename and create category subdirectory
    const fileName = generateFileName(file.name);
    const categoryDir = path.join(UPLOAD_DIR, category);

    if (!existsSync(categoryDir)) {
      await mkdir(categoryDir, { recursive: true });
    }

    const filePath = path.join(categoryDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return success response with file info
    const fileUrl = `/uploads/${category}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      category,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // List files in category or all files
    const targetDir = category ? path.join(UPLOAD_DIR, category) : UPLOAD_DIR;

    if (!existsSync(targetDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = [];

    if (category) {
      // List files in specific category
      const categoryFiles = await readdir(targetDir);
      for (const file of categoryFiles) {
        const filePath = path.join(targetDir, file);
        const stats = await stat(filePath);
        if (stats.isFile()) {
          files.push({
            name: file,
            url: `/uploads/${category}/${file}`,
            size: stats.size,
            category,
            uploadedAt: stats.birthtime.toISOString(),
          });
        }
      }
    } else {
      // List all files across all categories
      const categories = await readdir(UPLOAD_DIR);
      for (const cat of categories) {
        const catDir = path.join(UPLOAD_DIR, cat);
        const catStat = await stat(catDir);
        if (catStat.isDirectory()) {
          const categoryFiles = await readdir(catDir);
          for (const file of categoryFiles) {
            const filePath = path.join(catDir, file);
            const stats = await stat(filePath);
            if (stats.isFile()) {
              files.push({
                name: file,
                url: `/uploads/${cat}/${file}`,
                size: stats.size,
                category: cat,
                uploadedAt: stats.birthtime.toISOString(),
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error listing files:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("file");
    const category = searchParams.get("category") || "general";

    if (!fileName) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }

    // Construct file path
    const filePath = path.join(UPLOAD_DIR, category, fileName);

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete the file
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
      fileName,
      category,
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
