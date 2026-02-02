import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

import LandingPage from "./pages/landing";
import StoryPage from "./pages/story";
import GalleryPage from "./pages/gallery";
import LoveNotesPage from "./pages/love-notes";
import GamesPage from "./pages/games";
import SurprisePage from "./pages/surprise";
import ValentinePage from "./pages/valentine";
import NotFound from "./pages/not-found";

import LoveTreeNav from "./components/love-tree-nav";
import AmbientFX from "./components/ambient-fx";
import MusicToggle from "./components/music-toggle";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/story" component={StoryPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/notes" component={LoveNotesPage} />
      <Route path="/games" component={GamesPage} />
      <Route path="/surprise" component={SurprisePage} />
      <Route path="/valentine" component={ValentinePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />

        <div className="min-h-dvh valentine-surface grain-overlay">
          <AmbientFX />
          <MusicToggle />

          <main className="relative z-10 pb-28">
            <Router />
          </main>

          <LoveTreeNav />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
