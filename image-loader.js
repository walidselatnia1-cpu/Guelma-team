/**
 * Custom Image Loader for Next.js
 * Routes /uploads/ images through our API route for optimization
 * Uses Next.js default loader for other images
 */

export default function imageLoader({ src, width, quality, format }) {
  // If the image is from /uploads/, route it through our API
  if (src.startsWith("/uploads/")) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = new URL(src, baseUrl);

    // Add width parameter
    if (width) {
      url.searchParams.set("w", width.toString());
    }

    // Add quality parameter
    const qualityValue = quality || 80;
    url.searchParams.set("q", qualityValue.toString());

    // Add format parameter if provided
    if (format) {
      url.searchParams.set("f", format);
    }

    return url.pathname + url.search;
  }

  // For other images, use Next.js default loader
  return `${src}?w=${width}&q=${quality || 65}${format ? `&f=${format}` : ""}`;
}
