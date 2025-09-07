import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import { categories } from '@/data/categories';

export async function GET() {
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/explore', priority: '0.9', changefreq: 'daily' },
    { url: '/search', priority: '0.8', changefreq: 'weekly' },
    { url: '/recipes', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
    { url: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  ];

  // Dynamic category pages
  const categoryPages = categories.map(category => ({
    url: category.href,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  // Combine all pages
  const allPages = [...staticPages, ...categoryPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteConfig.url}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
