
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    setLoading(true);
    try {
      console.log("Fetching user profiles...");
      
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }
      
      console.log("Fetched profiles:", profiles?.length || 0);

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        throw rolesError;
      }
      
      console.log("Fetched user roles:", roles?.length || 0);
      
      // Combine profiles with roles
      const combinedProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
        const userRole = roles?.find((role: any) => role.user_id === profile.id);
        
        return {
          id: profile.id || '',
          username: profile.username || 'No username',
          email: profile.username || 'Email not available', // Using username as fallback for email
          role: userRole?.role || 'user',
          created_at: profile.created_at || new Date().toISOString()
        };
      });

      console.log("Combined profiles:", combinedProfiles.length);
      setUserProfiles(combinedProfiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      // Set an empty array to prevent undefined errors
      setUserProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    userProfiles,
    loading,
    fetchUserProfiles
  };
};
