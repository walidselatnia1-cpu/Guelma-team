export const dynamic = "force-static";

import React from "react";
import Sitemap from "@/components/main/Sitemap";

export default async function SitemapPage() {
  return (
    <>
      <div className="pl-2 pr-4 py-8  xl mx-auto">
        <Sitemap />
      </div>
    </>
  );
}
