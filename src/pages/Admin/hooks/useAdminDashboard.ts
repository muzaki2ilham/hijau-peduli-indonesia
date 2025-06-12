
import { useState, useEffect, useCallback } from 'react';
import { dummyComplaints } from "@/data/dummyComplaints";
import { dummyServiceRequests } from "@/data/dummyServiceRequests";
import { dummyUserProfiles } from "@/data/dummyUsers";

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

export const useAdminDashboard = () => {
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        const sortedComplaints = [...dummyComplaints]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);
        
        const sortedRequests = [...dummyServiceRequests]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);
        
        setRecentComplaints(sortedComplaints);
        setRecentRequests(sortedRequests);
        setLoading(false);
        setIsInitialLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Gagal memuat data dashboard');
      setLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  const fetchUserProfiles = useCallback(async () => {
    try {
      setUsersLoading(true);
      
      setTimeout(() => {
        setUserProfiles(dummyUserProfiles);
        setUsersLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching user profiles:', err);
      setUsersLoading(false);
    }
  }, []);

  const fetchAllComplaints = useCallback(async (): Promise<Complaint[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyComplaints);
      }, 300);
    });
  }, []);

  const fetchAllRequests = useCallback(async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyServiceRequests);
      }, 300);
    });
  }, []);

  const updateComplaintStatus = useCallback(async (id: string, status: string): Promise<boolean> => {
    // Mock update - just return success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }, []);

  const respondToComplaint = useCallback(async (id: string, response: string, adminName: string): Promise<boolean> => {
    // Mock response - just return success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }, []);

  const fetchComplaintResponses = useCallback(async (complaintId: string): Promise<ComplaintResponse[]> => {
    // Mock responses - return empty array for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
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
