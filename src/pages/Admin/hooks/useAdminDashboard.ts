
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Complaint {
  id: string;
  name: string;
  complaint_type: string;
  status: string;
  location: string;
  description: string;
  email: string;
  user_id: string | null;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  service_type: string;
  status: string;
  request_date: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  user_id: string | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export const useAdminDashboard = () => {
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchUserProfiles();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch recent complaints
      const { data: complaints, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (complaintsError) throw complaintsError;
      setRecentComplaints(complaints || []);

      // Fetch recent service requests
      const { data: requests, error: requestsError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (requestsError) throw requestsError;
      setRecentRequests(requests || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfiles = async () => {
    setUsersLoading(true);
    try {
      // Fetch all users with their roles
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, username, created_at');

      if (usersError) throw usersError;

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get the actual user email from auth (requires admin access)
      const { data: authUsers, error: authError } = await supabase
        .rpc('get_all_users_email');

      if (authError) throw authError;

      // Combine the data
      const combinedProfiles: UserProfile[] = users.map((user: any) => {
        const userRole = roles.find((role: any) => role.user_id === user.id);
        const authUser = authUsers?.find((auth: any) => auth.id === user.id);
        
        return {
          id: user.id,
          username: user.username || 'No username',
          email: authUser?.email || 'No email',
          role: userRole?.role || 'user',
          created_at: user.created_at
        };
      });

      setUserProfiles(combinedProfiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchAllComplaints = async (): Promise<Complaint[]> => {
    try {
      // Fetch all complaints
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all complaints:', error);
      return [];
    }
  };

  const fetchAllRequests = async (): Promise<ServiceRequest[]> => {
    try {
      // Fetch all service requests
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all service requests:', error);
      return [];
    }
  };

  return {
    recentComplaints,
    recentRequests,
    userProfiles,
    loading,
    usersLoading,
    fetchDashboardData,
    fetchUserProfiles,
    fetchAllComplaints,
    fetchAllRequests
  };
};
