import { LandingHero } from "@/character/LandingHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TechnicalEcosystem } from "@/components/home/TechnicalEcosystem";
import { KeepExploring } from "@/components/home/KeepExploring";
import { Seo } from "@/components/Seo";
import "@/styles/interactive.css";

export function HomePage() {
  return (
    <div className="home-canvas">
      <Seo
        title="Jyotirmay Khare — Full Stack Developer | Portfolio"
        description="Jyotirmay Khare is a Full Stack Developer building real software products across frontend, backend, databases, cloud and interactive experiences — WaveBeats, TradeScope Pro, PriceRadar, LPU Navigator and more."
        path="/"
      />
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

