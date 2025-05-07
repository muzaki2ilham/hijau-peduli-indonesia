
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
      
      // Fetch all users with their roles
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, username, created_at');

      if (usersError) {
        console.error("Error fetching profiles:", usersError);
        throw usersError;
      }
      
      console.log("Fetched profiles:", users?.length || 0);

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        throw rolesError;
      }
      
      console.log("Fetched user roles:", roles?.length || 0);

      // Since the function call is giving errors, let's work with the data we have
      // Instead of calling the edge function
      const combinedProfiles: UserProfile[] = (users || []).map((user: any) => {
        const userRole = roles?.find((role: any) => role.user_id === user.id);
        
        return {
          id: user.id,
          username: user.username || 'No username',
          email: user.username || 'Email not available', // Using username as fallback for email
          role: userRole?.role || 'user',
          created_at: user.created_at
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
