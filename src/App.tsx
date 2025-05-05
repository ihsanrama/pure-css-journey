
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import IndustrySelection from "./pages/IndustrySelection";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });
  
  const [selectedIndustry, setSelectedIndustry] = useState(() => {
    return localStorage.getItem("selectedIndustry");
  });

  const handleLogin = (email: string) => {
    localStorage.setItem("user", JSON.stringify({ email }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedIndustry");
    setIsAuthenticated(false);
    setSelectedIndustry(null);
  };

  const handleIndustrySelect = (industry: string) => {
    localStorage.setItem("selectedIndustry", industry);
    setSelectedIndustry(industry);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? 
                  <Navigate to={selectedIndustry ? "/" : "/industry-selection"} /> : 
                  <Auth onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/industry-selection" 
              element={
                !isAuthenticated ? 
                  <Navigate to="/auth" /> : 
                  <IndustrySelection onIndustrySelect={handleIndustrySelect} />
              } 
            />
            <Route 
              path="/" 
              element={
                !isAuthenticated ? 
                  <Navigate to="/auth" /> : 
                  (!selectedIndustry ? 
                    <Navigate to="/industry-selection" /> : 
                    <Index onLogout={handleLogout} />)
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
