import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ClientLayout from "@/components/ClientLayout";
import CustomCodeInjector from "@/components/CustomCodeInjector";
import { getHeaderCode, getBodyCode, getFooterCode } from "@/lib/custom-code";

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
  // Load custom code settings
  const [headerCode, bodyCode, footerCode] = await Promise.all([
    getHeaderCode(),
    getBodyCode(),
    getFooterCode(),
  ]);

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
