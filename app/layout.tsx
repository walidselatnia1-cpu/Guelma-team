import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ClientLayout from "@/components/ClientLayout";
import CustomCodeInjector from "@/components/CustomCodeInjector";
import { getAdminSettings } from "@/lib/admin-settings";

export const metadata: Metadata = {
  title: "Calama Team Recipes - Delicious Family-Friendly Recipes",
  description:
    "Discover amazing recipes from Guelma Team. Perfect for family meals, special occasions, and everyday cooking. Easy-to-follow instructions with professional tips.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <script
          src="//d3u598arehftfk.cloudfront.net/prebid_hb_15746_26827.js"
          async
        ></script>
        <CustomCodeInjector />
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
