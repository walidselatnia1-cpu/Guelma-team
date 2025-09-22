import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ClientLayout from "@/components/ClientLayout";
import CustomCodeInjector from "@/components/CustomCodeInjector";
import { getAdminSettings } from "@/lib/admin-settings";
import { Fragment } from "react";
import { headers } from "next/headers";

// ISR: Revalidate every hour, but allow on-demand revalidation via cache tags
export const revalidate = 36;

export const metadata: Metadata = {
  title: "Calama Team Recipes - Delicious Family-Friendly Recipes",
  description:
    "Discover amazing recipes from Guelma Team. Perfect for family meals, special occasions, and everyday cooking. Easy-to-follow instructions with professional tips.",
};

// Define pages where scripts should NOT be loaded
const SCRIPT_EXCLUDED_ROUTES = [
  "/admin",
  "/admin/",
  "/checkout",
  "/checkout/",
  "/privacy",
  "/terms",
  // Add more routes as needed
];

// Check if current route should exclude scripts
function shouldExcludeScripts(pathname: string): boolean {
  return SCRIPT_EXCLUDED_ROUTES.some((route) => {
    // Exact match or starts with route (for sub-pages)
    return pathname === route || pathname.startsWith(route + "/");
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current pathname
  const headersList = headers() as any;
  const pathname = headersList.get("x-pathname") || "";

  // Check if scripts should be excluded for this route
  const excludeScripts = shouldExcludeScripts(pathname);

  // Load custo
  // Load custom code settings from database
  const settings = await getAdminSettings();

  // Extract code for each section
  const headerCode = {
    html: settings.header.html.join("\n"),
    css: settings.header.css.join("\n"),
    javascript: settings.header.javascript.join("\n"),
  };

  const bodyCode = {
    html: settings.body.html.join("\n"),
    css: settings.body.css.join("\n"),
    javascript: settings.body.javascript.join("\n"),
  };

  const footerCode = {
    html: settings.footer.html.join("\n"),
    css: settings.footer.css.join("\n"),
    javascript: settings.footer.javascript.join("\n"),
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="title"
          content="Guelma Team Recipes - Delicious Family-Friendly Recipes"
        />

        <style>
          {`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}
        </style>

        {!excludeScripts &&
          settings.header?.html?.map((script, index) => {
            // If it's a script tag, parse src and other attributes
            if (script.trim().startsWith("<script")) {
              const srcMatch = script.match(/src=["']([^"']+)["']/);
              const asyncMatch = script.includes("async");
              const deferMatch = script.includes("defer");
              const crossOriginMatch = script.match(
                /crossorigin=["']([^"']+)["']/
              ) as any;

              if (srcMatch) {
                return (
                  <script
                    key={`header-script-${index}`}
                    src={srcMatch[1]}
                    async={asyncMatch}
                    defer={deferMatch}
                    crossOrigin={crossOriginMatch[1]}
                  />
                );
              }
            }
            return null;
          })}
      </head>
      <body className="layout-container">
        {/* Custom Body Code */}
        {bodyCode.html && (
          <div dangerouslySetInnerHTML={{ __html: bodyCode.html }} />
        )}
        {bodyCode.css && (
          <style dangerouslySetInnerHTML={{ __html: bodyCode.css }} />
        )}
        {bodyCode.javascript && (
          <script dangerouslySetInnerHTML={{ __html: bodyCode.javascript }} />
        )}

        <Header />
        <main className="content-area">
          <ClientLayout>{children}</ClientLayout>
        </main>
        <Footer />

        {/* Custom Footer Code */}
        {footerCode.html && (
          <div dangerouslySetInnerHTML={{ __html: footerCode.html }} />
        )}
        {footerCode.css && (
          <style dangerouslySetInnerHTML={{ __html: footerCode.css }} />
        )}
        {footerCode.javascript && (
          <script dangerouslySetInnerHTML={{ __html: footerCode.javascript }} />
        )}
      </body>
    </html>
  );
}
