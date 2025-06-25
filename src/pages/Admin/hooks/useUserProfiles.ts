
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfiles = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles with user roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          created_at,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Transform data to include email and role
      const transformedProfiles = profilesData?.map(profile => ({
        id: profile.id,
        username: profile.username || 'Unknown',
        email: profile.username || 'unknown@email.com', // Using username as email fallback
        role: (profile.user_roles as any)?.[0]?.role || 'user',
        created_at: profile.created_at
      })) || [];

      setUserProfiles(transformedProfiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return {
    userProfiles,
    loading,
    fetchUserProfiles
  };
};
