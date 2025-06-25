
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface Complaint {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  location: string;
  complaint_type: string;
  description: string;
  status: 'pending' | 'read' | 'in_progress' | 'resolved' | 'responded';
  attachments?: string[];
  admin_response?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplaintResponse {
  id: string;
  complaint_id: string;
  response_text: string;
  admin_name: string;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  description: string;
  request_date: string;
  status: 'pending' | 'approved' | 'in_review' | 'completed';
  attachments?: string[];
  created_at: string;
  updated_at: string;
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch recent complaints with updated_at field
      const { data: complaintsData, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (complaintsError) throw complaintsError;

      // Fetch recent service requests with updated_at field
      const { data: requestsData, error: requestsError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (requestsError) throw requestsError;

      // Transform complaints data to match interface
      const transformedComplaints: Complaint[] = complaintsData?.map(complaint => ({
        ...complaint,
        status: complaint.status as Complaint['status'],
        updated_at: complaint.created_at // Use created_at as fallback for updated_at
      })) || [];

      // Transform requests data to match interface
      const transformedRequests: ServiceRequest[] = requestsData?.map(request => ({
        ...request,
        status: request.status as ServiceRequest['status'],
        updated_at: request.created_at // Use created_at as fallback for updated_at
      })) || [];

      setRecentComplaints(transformedComplaints);
      setRecentRequests(transformedRequests);
      setLoading(false);
      setIsInitialLoading(false);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError('Gagal memuat data dashboard');
      setLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  const fetchUserProfiles = useCallback(async () => {
    try {
      setUsersLoading(true);
      
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
      setUsersLoading(false);
    } catch (err: any) {
      console.error('Error fetching user profiles:', err);
      setUsersLoading(false);
    }
  }, []);

  const fetchAllComplaints = useCallback(async (): Promise<Complaint[]> => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(complaint => ({
        ...complaint,
        status: complaint.status as Complaint['status'],
        updated_at: complaint.created_at // Use created_at as fallback for updated_at
      })) || [];
    } catch (err: any) {
      console.error('Error fetching all complaints:', err);
      return [];
    }
  }, []);

  const fetchAllRequests = useCallback(async (): Promise<ServiceRequest[]> => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(request => ({
        ...request,
        status: request.status as ServiceRequest['status'],
        updated_at: request.created_at // Use created_at as fallback for updated_at
      })) || [];
    } catch (err: any) {
      console.error('Error fetching all requests:', err);
      return [];
    }
  }, []);

  const updateComplaintStatus = useCallback(async (id: string, status: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err: any) {
      console.error('Error updating complaint status:', err);
      return false;
    }
  }, []);

  const respondToComplaint = useCallback(async (id: string, response: string, adminName: string): Promise<boolean> => {
    try {
      // Insert response
      const { error: responseError } = await supabase
        .from('complaint_responses')
        .insert({
          complaint_id: id,
          response_text: response,
          admin_name: adminName
        });

      if (responseError) throw responseError;

      // Update complaint status to responded
      const { error: statusError } = await supabase
        .from('complaints')
        .update({ status: 'responded' })
        .eq('id', id);

      if (statusError) throw statusError;
      return true;
    } catch (err: any) {
      console.error('Error responding to complaint:', err);
      return false;
    }
  }, []);

  const fetchComplaintResponses = useCallback(async (complaintId: string): Promise<ComplaintResponse[]> => {
    try {
      const { data, error } = await supabase
        .from('complaint_responses')
        .select('*')
        .eq('complaint_id', complaintId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('Error fetching complaint responses:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    recentComplaints,
    recentRequests,
    userProfiles,
    loading,
    usersLoading,
    isInitialLoading,
    error,
    fetchUserProfiles,
    fetchAllComplaints,
    fetchAllRequests,
    fetchDashboardData,
    updateComplaintStatus,
    respondToComplaint,
    fetchComplaintResponses
  };
};
