import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Winners from "./pages/Winners";
import HowWeVerify from "./pages/HowWeVerify";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/winners" element={<Winners />} />
              <Route path="/how-we-verify" element={<HowWeVerify />} />
              {/* Category Pages */}
              <Route path="/cash-sweepstakes" element={<CategoryPage />} />
              <Route path="/electronics-giveaways" element={<CategoryPage />} />
              <Route path="/travel-sweepstakes" element={<CategoryPage />} />
              <Route path="/gaming-giveaways" element={<CategoryPage />} />
              <Route path="/grocery-sweepstakes" element={<CategoryPage />} />
              <Route path="/automotive-sweepstakes" element={<CategoryPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
