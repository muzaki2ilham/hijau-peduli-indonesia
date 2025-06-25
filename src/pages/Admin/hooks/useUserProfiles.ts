
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
      
      // First, get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Then, get user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.warn('Could not fetch user roles:', rolesError);
      }

      // Try to get user emails from the edge function
      let usersWithEmails: { id: string; email: string }[] = [];
      try {
        const { data: emailsData, error: emailsError } = await supabase.functions.invoke('get_all_users_email');
        if (!emailsError && emailsData) {
          usersWithEmails = emailsData;
        }
      } catch (emailError) {
        console.warn('Could not fetch user emails:', emailError);
      }

      // Combine the data
      const transformedProfiles: UserProfile[] = profilesData?.map(profile => {
        // Find role for this user
        const userRole = rolesData?.find(role => role.user_id === profile.id);
        
        // Find email for this user
        const userEmail = usersWithEmails.find(user => user.id === profile.id);
        
        return {
          id: profile.id,
          username: profile.username || 'Unknown',
          email: userEmail?.email || profile.username || 'Email not available',
          role: userRole?.role || 'user',
          created_at: profile.created_at
        };
      }) || [];

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
