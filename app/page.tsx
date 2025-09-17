export const dynamic = "force-static";

import CategoriesSection from "@/components/main/CategoriesSection";
import HeroSection from "@/components/main/HeroSection";
import LatestArticlesSection from "@/components/main/LatestArticlesSection";
import LatestRecipesSection from "@/components/main/LatestRecipesSection";
import TrendingSection from "@/components/main/TrendingSection";

export default function HomePage() {
  return (
    <div className="page-content">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full bg-stone-100">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 ">
          <div className="sticky top-8">
            {/* Left sidebar content can go here */}
          </div>
        </div>

        {/* Explore Content - Middle */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <HeroSection />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {/* Right sidebar content can go here */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 ">
          <div className="sticky top-8">
            {/* Left sidebar content can go here */}
          </div>
        </div>

        {/* Explore Content - Middle */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <CategoriesSection />
            <LatestRecipesSection />
            <TrendingSection />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {/* Right sidebar content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
