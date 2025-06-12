
import { useState, useEffect, useCallback } from 'react';
import { dummyComplaints } from "@/data/dummyComplaints";
import { dummyServiceRequests } from "@/data/dummyServiceRequests";
import { dummyUserProfiles } from "@/data/dummyUsers";

export const useAdminDashboard = () => {
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
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
      
      // Simulasi loading dan ambil data terbaru (5 terakhir)
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
      
      // Simulasi loading
      setTimeout(() => {
        setUserProfiles(dummyUserProfiles);
        setUsersLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching user profiles:', err);
      setUsersLoading(false);
    }
  }, []);

  const fetchAllComplaints = useCallback(async () => {
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
    fetchDashboardData
  };
};
