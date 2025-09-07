import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

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
Allow: /search

# Crawl delay (optional)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
