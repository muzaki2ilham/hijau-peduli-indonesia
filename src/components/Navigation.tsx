
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Don't show navigation on the auth page
  if (location.pathname === '/auth') return null;
  
  return (
    <nav className="bg-white shadow-sm py-3">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-green-800 font-bold text-xl">
            Tegal Asri
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/services" className="text-gray-600 hover:text-green-600">
            Layanan
          </Link>
          {isLoggedIn ? (
            <Button 
              onClick={() => navigate('/profile')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Profil Saya
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Masuk / Daftar
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
