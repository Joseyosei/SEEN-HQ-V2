import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SubmitPage from "./pages/SubmitPage";
import SuccessPage from "./pages/SuccessPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQsPage from "./pages/FAQsPage";
import CategoriesPage from "./pages/CategoriesPage";
import PricingPage from "./pages/PricingPage";
import MediaHubPage from "./pages/MediaHubPage";
import ResultsPage from "./pages/ResultsPage";
import ClientsPage from "./pages/ClientsPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminListings from "./pages/admin/AdminListings";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminVideos from "./pages/admin/AdminVideos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/media-hub" element={<MediaHubPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="listings" element={<AdminListings />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="videos" element={<AdminVideos />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
