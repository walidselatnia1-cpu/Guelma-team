import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mime from "mime";
import sharp from "sharp";

export async function GET(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathParts } = await context.params;
    const filePath = path.join(process.cwd(), "uploads", ...pathParts);

    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }

    const url = new URL(req.url);
    const width = url.searchParams.get("w");
    const height = url.searchParams.get("h");
    const quality = url.searchParams.get("q") || "80";

    const mimeType = mime.getType(filePath) || "application/octet-stream";
    const isImage =
      mimeType.startsWith("image/") &&
      [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/avif",
      ].includes(mimeType);

    // Debug logging
    console.log("🖼️ Image request:", {
      filePath,
      mimeType,
      isImage,
      width,
      height,
      hasParams: !!(width || height),
    });

    // If not an image, serve original
    if (!isImage) {
      console.log("❌ Not an image, serving original");
      const fileBuffer = await fs.readFile(filePath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Always optimize images (even without resize parameters for better performance)
    console.log("✅ Optimizing image");

    // Optimize image
    try {
      let sharpInstance = sharp(filePath);

      // Apply resizing if requested
      if (width || height) {
        const resizeOptions: any = {};
        if (width) resizeOptions.width = parseInt(width);
        if (height) resizeOptions.height = parseInt(height);
        resizeOptions.fit = "cover";
        resizeOptions.position = "center";

        sharpInstance = sharpInstance.resize(resizeOptions);
      }

      // Force conversion to modern formats (AVIF preferred for better compression)
      const originalFormat = mimeType.split("/")[1];

      let outputFormat = "webp";
      let outputMimeType = "image/webp";

      // Check if the original format is already WebP/AVIF
      if (originalFormat === "webp") {
        outputFormat = "webp";
        outputMimeType = "image/webp";
      } else if (originalFormat === "avif") {
        outputFormat = "avif";
        outputMimeType = "image/avif";
      }

      console.log("🔄 Converting:", {
        originalFormat,
        outputFormat,
        outputMimeType,
        width,
        height,
        quality,
      });
      // For PNG/JPEG, we'll convert to AVIF (best compression)

      // Apply format-specific options
      const formatOptions: any = { quality: parseInt(quality) };

      if (outputFormat === "avif") {
        sharpInstance = sharpInstance.avif(formatOptions);
      } else if (outputFormat === "webp") {
        sharpInstance = sharpInstance.webp(formatOptions);
      } else if (outputFormat === "jpeg" || outputFormat === "jpg") {
        sharpInstance = sharpInstance.jpeg(formatOptions);
      } else if (outputFormat === "png") {
        sharpInstance = sharpInstance.png({ compressionLevel: 6 });
      }

      const optimizedBuffer = await sharpInstance.toBuffer();

      console.log("✅ Optimization successful:", {
        originalSize: (await fs.stat(filePath)).size,
        optimizedSize: optimizedBuffer.length,
        compressionRatio:
          ((await fs.stat(filePath)).size / optimizedBuffer.length).toFixed(2) +
          "x",
        outputFormat,
        outputMimeType,
      });

      return new NextResponse(new Uint8Array(optimizedBuffer), {
        headers: {
          "Content-Type": outputMimeType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Optimized": "true",
        },
      });
    } catch (optimizationError) {
      console.warn(
        "Image optimization failed, serving original:",
        optimizationError
      );
      // Fallback to original file
      const fileBuffer = await fs.readFile(filePath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (err) {
    console.error("File serving error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
