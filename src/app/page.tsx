import Nav from "@/components/nav";
import Hero from "@/components/hero";
import FeaturedSection from "@/components/featured";
import AboutSection from "@/components/about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <FeaturedSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
