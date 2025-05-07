
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

export interface ComplaintResponse {
  id: string;
  complaint_id: string;
  response_text: string;
  created_at: string;
  admin_name: string;
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
      console.log("Fetching dashboard data...");
      
      // Fetch recent complaints
      const { data: complaints, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (complaintsError) {
        console.error("Error fetching complaints:", complaintsError);
        throw complaintsError;
      }
      
      console.log("Fetched complaints:", complaints?.length || 0);
      setRecentComplaints(complaints || []);

      // Fetch recent service requests
      const { data: requests, error: requestsError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (requestsError) {
        console.error("Error fetching service requests:", requestsError);
        throw requestsError;
      }
      
      console.log("Fetched service requests:", requests?.length || 0);
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

      // Get the actual user email from auth (requires admin access)
      console.log("Invoking get_all_users_email function...");
      const { data: authUsers, error: authError } = await supabase
        .functions.invoke('get_all_users_email');

      if (authError) {
        console.error("Error invoking get_all_users_email:", authError);
        throw authError;
      }
      
      console.log("Fetched auth users:", authUsers?.length || 0);

      // Combine the data
      const combinedProfiles: UserProfile[] = users.map((user: any) => {
        const userRole = roles?.find((role: any) => role.user_id === user.id);
        const authUser = authUsers ? authUsers.find((auth: any) => auth.id === user.id) : null;
        
        return {
          id: user.id,
          username: user.username || 'No username',
          email: authUser?.email || 'No email',
          role: userRole?.role || 'user',
          created_at: user.created_at
        };
      });

      console.log("Combined profiles:", combinedProfiles.length);
      setUserProfiles(combinedProfiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchAllComplaints = async (): Promise<Complaint[]> => {
    try {
      console.log("Fetching all complaints...");
      // Fetch all complaints
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching all complaints:", error);
        throw error;
      }
      
      console.log("Fetched all complaints:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Error fetching all complaints:', error);
      return [];
    }
  };

  const fetchAllRequests = async (): Promise<ServiceRequest[]> => {
    try {
      console.log("Fetching all service requests...");
      // Fetch all service requests
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching all service requests:", error);
        throw error;
      }
      
      console.log("Fetched all service requests:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Error fetching all service requests:', error);
      return [];
    }
  };

  const updateComplaintStatus = async (id: string, status: string): Promise<boolean> => {
    try {
      // Call the edge function to update status
      const { data, error } = await supabase
        .functions.invoke('update-complaint-status', {
          body: { id, status }
        });
      
      if (error) throw error;
      
      // Update local state
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === id ? { ...complaint, status } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error updating complaint status:', error);
      return false;
    }
  };
  
  const respondToComplaint = async (complaintId: string, responseText: string, adminName: string): Promise<boolean> => {
    try {
      // Call the edge function to respond to complaint
      const { data, error } = await supabase
        .functions.invoke('respond-to-complaint', {
          body: {
            complaintId,
            responseText,
            adminName
          }
        });
      
      if (error) throw error;
      
      // Update local state - mark the complaint as responded
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === complaintId ? { ...complaint, status: 'responded' } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error responding to complaint:', error);
      return false;
    }
  };
  
  const fetchComplaintResponses = async (complaintId: string): Promise<ComplaintResponse[]> => {
    try {
      // Call the edge function to get responses
      const { data, error } = await supabase
        .functions.invoke('complaint-responses', {
          body: { complaintId }
        });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching complaint responses:', error);
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
    fetchAllRequests,
    updateComplaintStatus,
    respondToComplaint,
    fetchComplaintResponses
  };
};
