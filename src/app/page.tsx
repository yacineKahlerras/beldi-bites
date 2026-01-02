import Nav from "@/components/nav";
import Hero from "@/components/hero";
import FeaturedSection from "@/components/featured";

export default function Home() {
  const boop: any = "hello";
  console.log("helloooooooooooo", boop);
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <FeaturedSection />
    </div>
  );
}
