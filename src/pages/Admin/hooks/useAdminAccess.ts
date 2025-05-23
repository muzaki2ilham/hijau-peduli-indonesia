
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAdminAccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user) {
          toast({
            title: "Akses Ditolak",
            description: "Silakan login untuk mengakses halaman admin",
            variant: "destructive"
          });
          navigate('/auth');
          return false;
        }
        
        // Check for admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.session.user.id)
          .eq('role', 'admin')
          .single();
        
        if (error || !data) {
          toast({
            title: "Akses Ditolak",
            description: "Anda tidak memiliki hak akses admin",
            variant: "destructive"
          });
          navigate('/');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/auth');
        return false;
      }
    };

    const init = async () => {
      const adminStatus = await checkAdminStatus();
      setIsAdmin(adminStatus);
      setIsInitialLoading(false);
    };
    
    init();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return {
    isAdmin,
    isInitialLoading,
    handleLogout
  };
};
