import Nav from "@/components/nav";
import Hero from "@/components/hero";
import FeaturedSection from "@/components/featured";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <FeaturedSection />
    </div>
  );
}
