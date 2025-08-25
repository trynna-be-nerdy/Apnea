import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomTabs } from "./components/navigation/BottomTabs";
import { HomeScreen } from "./components/screens/HomeScreen";
import { NightSessionScreen } from "./components/screens/NightSessionScreen";
import { HistoryScreen } from "./components/screens/HistoryScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-bg text-text">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/night-session" element={<NightSessionScreen />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/coach" element={<div className="p-4 pb-20 text-center text-muted">Coach Screen - Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-4 pb-20 text-center text-muted">Settings Screen - Coming Soon</div>} />
            <Route path="/morning-report" element={<div className="p-4 pb-20 text-center text-muted">Morning Report - Coming Soon</div>} />
            <Route path="/diary" element={<div className="p-4 pb-20 text-center text-muted">Diary Screen - Coming Soon</div>} />
            <Route path="/routine" element={<div className="p-4 pb-20 text-center text-muted">Routine Screen - Coming Soon</div>} />
            <Route path="/caffeine" element={<div className="p-4 pb-20 text-center text-muted">Caffeine Screen - Coming Soon</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomTabs />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
