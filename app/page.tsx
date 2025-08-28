import CategoriesSection from "@/components/main/CategoriesSection";
import HeroSection from "@/components/main/HeroSection";
import LatestArticlesSection from "@/components/main/LatestArticlesSection";
import LatestRecipesSection from "@/components/main/LatestRecipesSection";
import TrendingSection from "@/components/main/TrendingSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <LatestRecipesSection />
      <LatestArticlesSection />
      <TrendingSection />
    </>
  );
}
