import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Capable } from "@/components/sections/Capable";
import { SharedSkills } from "@/components/sections/SharedSkills";
import { Comparison } from "@/components/sections/Comparison";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";
import { Preorder } from "@/components/sections/Preorder";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Capable />
      <SharedSkills />
      <Comparison />
      <WhoThisIsFor />
      <Preorder />
      <Footer />
    </main>
  );
}
