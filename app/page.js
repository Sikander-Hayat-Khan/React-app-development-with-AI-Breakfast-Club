import HeroSection from "@/components/HeroSection";
import TopDishes from "@/components/TopDishes";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection />
      {/* Yellow section divider */}
      <div className="w-11/12 max-w-7xl mx-auto my-8 border-b-2 border-yellow-400" />
      <TopDishes />
      {/* Yellow section divider */}
      <div className="w-11/12 max-w-7xl mx-auto my-8 border-b-2 border-yellow-400" />
      <ReviewsSection />
    </main>
  );
}

