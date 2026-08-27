import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LinkedInPage } from "@/pages/LinkedIn";
import { LoadingProvider } from "@/context/LoadingProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HomePage } from "@/pages/Home";
import { ProjectsPage } from "@/pages/Projects";
import { TechProjectsPage } from "@/pages/TechProjectsPage";
import { OtherProjectsPage } from "@/pages/OtherProjectsPage";
import { CertificationsPage } from "@/pages/CertificationsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetail";
import { AboutPage } from "@/pages/About";
import { ContactPage } from "@/pages/Contact";
import { NotFoundPage } from "@/pages/NotFound";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Home-page anchor (e.g. /#work) — wait a tick for render
      const id = hash.slice(1);
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

function App() {
  useSmoothScroll();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <LoadingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <Navbar onOpenCommand={() => setPaletteOpen(true)} />
        <RouterRoutes />
        <Footer />
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
      </BrowserRouter>
    </LoadingProvider>
  );
}

function RouterRoutes() {
  return (
    <main id="main" className="pt-16">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/tech" element={<TechProjectsPage />} />
        <Route path="/projects/other" element={<OtherProjectsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/linkedin" element={<LinkedInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
