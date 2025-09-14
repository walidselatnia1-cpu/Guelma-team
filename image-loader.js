/**
 * Custom Image Loader for Next.js
 * Routes /uploads/ images through our API route for optimization
 * Uses Next.js default loader for other images
 */

export default function imageLoader({ src, width, quality }) {
  // If the image is from /uploads/, route it through our API
  if (src.startsWith("/uploads/")) {
    // Build the URL with optimization parameters
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = new URL(src, baseUrl);

    // Add width and height parameters for optimization
    if (width) {
      url.searchParams.set("w", width.toString());
    }

    // Add quality parameter (default to 80)
    const qualityValue = quality || 80;
    url.searchParams.set("q", qualityValue.toString());

    return url.pathname + url.search;
  }

  // For all other images, use Next.js default loader
  return `${src}?w=${width}&q=${quality || 75}`;
}
