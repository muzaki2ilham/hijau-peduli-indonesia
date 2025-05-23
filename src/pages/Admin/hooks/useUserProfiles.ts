
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
      console.log("Fetching ALL user profiles...");
      
      // First, fetch all profiles without any filters
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
      
      // Fetch emails using the edge function
      console.log("Fetching user emails via edge function...");
      const { data: emailsData, error: emailsError } = await supabase
        .functions.invoke('get_all_users_email');
        
      if (emailsError) {
        console.error("Error invoking get_all_users_email:", emailsError);
        throw emailsError;
      }
      
      if (!emailsData) {
        console.error("No email data returned from edge function");
        throw new Error("Failed to retrieve user emails");
      }
      
      console.log("Raw emails data:", emailsData);
      
      // Create a map of user ids to emails for easier lookup
      const emailsMap = Array.isArray(emailsData) 
        ? new Map(emailsData.map((user: any) => [user.id, user.email])) 
        : new Map();
      
      console.log("Fetched emails for users:", emailsMap.size);
      
      // Combine profiles with roles and emails
      const combinedProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
        // Find the role for this user if it exists
        const userRole = roles?.find((role: any) => role.user_id === profile.id);
        // Get email from the emails map
        const email = emailsMap.get(profile.id) || profile.email || profile.username || 'Email not available';
        
        return {
          id: profile.id || '',
          username: profile.username || 'No username',
          email: email,
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
