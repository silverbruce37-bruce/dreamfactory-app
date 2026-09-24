import { BentoGrid } from "@/components/BentoGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ModelCreator } from "@/components/ModelCreator";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <BentoGrid />
        <ModelCreator />
      </main>
      <Footer />
    </>
  );
}
