import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Software } from "@/components/sections/Software";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";
import { Preorder } from "@/components/sections/Preorder";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Software />
      <HowItWorks />
      <Comparison />
      <WhoThisIsFor />
      <Preorder />
      <Footer />
    </main>
  );
}
