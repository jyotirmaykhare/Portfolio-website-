import { LandingHero } from "@/character/LandingHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TechnicalEcosystem } from "@/components/home/TechnicalEcosystem";
import { KeepExploring } from "@/components/home/KeepExploring";
import "@/styles/interactive.css";

export function HomePage() {
  return (
    <div className="home-canvas">
      {/* Full-page animated introduction — the 3D character stays fixed on
          screen through SelectedWork and ends at Technical Ecosystem */}
      <LandingHero />
      <SelectedWork />
      <TechnicalEcosystem />

      {/* Explore band — quick jumps to the rest of the site */}
      <KeepExploring />
    </div>
  );
}

