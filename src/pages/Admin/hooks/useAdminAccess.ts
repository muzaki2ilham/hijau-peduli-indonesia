
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAdminAccess = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const checkAdminAccess = async () => {
      try {
        console.log("Checking admin access...");
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (isMounted) {
            setIsAdmin(false);
            setIsInitialLoading(false);
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
        
        // Check if user has admin role with timeout
        const { data: userRoles, error: roleError } = await Promise.race([
          supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Role check timeout')), 5000)
          )
        ]) as any;

        if (roleError) {
          console.error("Role check error:", roleError);
          if (isMounted) {
            setIsAdmin(false);
            setIsInitialLoading(false);
          }
          return;
        }

        const hasAdminRole = userRoles && userRoles.length > 0;
        console.log("Admin role check result:", hasAdminRole);
        
        if (isMounted) {
          setIsAdmin(hasAdminRole);
          setIsInitialLoading(false);
          
          if (!hasAdminRole) {
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        if (isMounted) {
          setIsAdmin(false);
          setIsInitialLoading(false);
          navigate('/');
        }
      }
    };

    checkAdminAccess();
    
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      navigate('/');
    }
  };

  return {
    isAdmin,
    isInitialLoading,
    handleLogout
  };
};
