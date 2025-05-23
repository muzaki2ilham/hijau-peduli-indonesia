
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
      
      // First, fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }
      
      console.log("Fetched profiles:", profiles?.length || 0);

      // Then fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        throw rolesError;
      }
      
      console.log("Fetched user roles:", roles?.length || 0);
      
      // Create a map of user ids to roles for easier lookup
      const rolesMap = new Map();
      roles?.forEach((role: any) => {
        rolesMap.set(role.user_id, role.role);
      });
      
      // Get user emails from auth.users via the edge function
      try {
        const { data: emailsData, error: emailsError } = await supabase.auth.admin.listUsers();
        
        if (!emailsError && emailsData && emailsData.users) {
          console.log("Fetched emails for users:", emailsData.users.length);
          
          // Create a map of user ids to emails for easier lookup
          const emailsMap = new Map();
          emailsData.users.forEach((user: any) => {
            emailsMap.set(user.id, user.email);
          });
          
          // Combine profiles with roles and emails
          const combinedProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
            return {
              id: profile.id || '',
              username: profile.username || 'No username',
              email: emailsMap.get(profile.id) || profile.email || profile.username || 'Email not available',
              role: rolesMap.get(profile.id) || 'user',
              created_at: profile.created_at || new Date().toISOString()
            };
          });

          console.log("Combined profiles:", combinedProfiles.length);
          setUserProfiles(combinedProfiles);
        } else {
          console.error("Error fetching user emails:", emailsError);
          
          // Even without emails, we can still show profiles with the data we have
          const fallbackProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
            return {
              id: profile.id || '',
              username: profile.username || 'No username',
              email: profile.email || profile.username || 'Email not available',
              role: rolesMap.get(profile.id) || 'user',
              created_at: profile.created_at || new Date().toISOString()
            };
          });
          
          setUserProfiles(fallbackProfiles);
        }
      } catch (emailError) {
        console.error('Error with email fetching:', emailError);
        
        // Fallback to show profiles without emails
        const fallbackProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
          return {
            id: profile.id || '',
            username: profile.username || 'No username',
            email: profile.email || profile.username || 'Email not available',
            role: rolesMap.get(profile.id) || 'user',
            created_at: profile.created_at || new Date().toISOString()
          };
        });
        
        setUserProfiles(fallbackProfiles);
      }
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
