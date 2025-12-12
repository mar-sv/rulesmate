import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import MockupComparison from "./pages/MockupComparison";
import MobileUXMockups from "./pages/MobileUXMockups";
import FeedbackMockups from "./pages/FeedbackMockups";
import LandingMockups from "./pages/LandingMockups";
import DesignVote from "./pages/DesignVote";
import GameInputMockups from "./pages/GameInputMockups";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mockups" element={<MockupComparison />} />
              <Route path="/mobile-ux" element={<MobileUXMockups />} />
              <Route path="/feedback-mockups" element={<FeedbackMockups />} />
              <Route path="/landing-mockups" element={<LandingMockups />} />
              <Route path="/design-vote" element={<DesignVote />} />
              <Route path="/game-input-mockups" element={<GameInputMockups />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
