
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MobileNavigation from "./components/MobileNavigation";
import Navigation from "./components/Navigation";
import AdminDashboard from "./pages/Admin/Dashboard";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const AppContent = () => {
  const isMobile = useIsMobile();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: session } = await supabase.auth.getSession();
      setIsLoggedIn(!!session.session);

      if (session.session?.user) {
        const { data: roleCheck } = await supabase.rpc('user_has_role', {
          _user_id: session.session.user.id,
          _role: 'admin'
        });
        setIsAdmin(!!roleCheck);
      }
      
      setLoading(false);
    };

    checkUserStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session);
      
      if (session?.user) {
        const { data: roleCheck } = await supabase.rpc('user_has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });
        setIsAdmin(!!roleCheck);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while checking auth status
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return (
    <>
      {!isAdmin && <Navigation />}
      <Routes>
        {/* Non-Admin Routes - Only shown to regular users */}
        {!isAdmin ? (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/auth" />} />
          </>
        ) : (
          // Redirect admin users from public pages to admin dashboard
          <>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/programs" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/education" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/services" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/gallery" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/blog" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/about" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/contact" element={<Navigate to="/admin/dashboard" />} />
          </>
        )}

        {/* Shared Routes */}
        <Route path="/auth" element={<Auth />} />

        {/* Admin Routes - Only accessible to admin users */}
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/users" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/complaints" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/requests" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/gallery" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/blog" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/programs" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/stats" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        <Route path="/admin/settings" element={isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!isAdmin && isMobile && <MobileNavigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
