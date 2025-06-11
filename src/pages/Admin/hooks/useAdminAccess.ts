
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAdminAccess = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number;
    
    const checkAdminAccess = async () => {
      try {
        console.log("Checking admin access...");
        
        // Set timeout to prevent infinite loading
        timeoutId = window.setTimeout(() => {
          if (isMounted && isInitialLoading) {
            console.error("Admin access check timed out");
            setIsAdmin(false);
            setIsInitialLoading(false);
            toast({
              title: "Terjadi kesalahan",
              description: "Gagal memverifikasi status admin. Silakan coba lagi.",
              variant: "destructive"
            });
            navigate('/auth');
          }
        }, 10000); // 10 second timeout
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (isMounted) {
            setIsAdmin(false);
            setIsInitialLoading(false);
            navigate('/auth');
          }
          return;
        }

        if (!session?.user) {
          console.log("No user session found");
          if (isMounted) {
            setIsAdmin(false);
            setIsInitialLoading(false);
            navigate('/auth');
          }
          return;
        }

        console.log("User found, checking admin role...");
        
        // Check if user has admin role
        const { data: userRoles, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin');

        if (roleError) {
          console.error("Role check error:", roleError);
          if (isMounted) {
            setIsAdmin(false);
            setIsInitialLoading(false);
            toast({
              title: "Terjadi kesalahan",
              description: "Gagal memverifikasi peran admin.",
              variant: "destructive"
            });
            navigate('/');
          }
          return;
        }

        const hasAdminRole = userRoles && userRoles.length > 0;
        console.log("Admin role check result:", hasAdminRole);
        
        if (isMounted) {
          setIsAdmin(hasAdminRole);
          setIsInitialLoading(false);
          
          if (!hasAdminRole) {
            toast({
              title: "Akses ditolak",
              description: "Anda tidak memiliki hak akses admin.",
              variant: "destructive"
            });
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        if (isMounted) {
          setIsAdmin(false);
          setIsInitialLoading(false);
          toast({
            title: "Terjadi kesalahan",
            description: "Gagal memverifikasi status admin.",
            variant: "destructive"
          });
          navigate('/');
        }
      } finally {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
      }
    };

    checkAdminAccess();
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Berhasil logout",
        description: "Anda telah keluar dari akun admin"
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal melakukan logout",
        variant: "destructive"
      });
      navigate('/');
    }
  };

  return {
    isAdmin,
    isInitialLoading,
    handleLogout
  };
};
