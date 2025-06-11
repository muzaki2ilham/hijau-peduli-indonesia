
// This file now combines all the individual hooks for easier usage throughout the admin components

import { useComplaints } from "./useComplaints";
import { useServiceRequests } from "./useServiceRequests";
import { useUserProfiles } from "./useUserProfiles";
import { useEffect, useState } from "react";
export type { Complaint, ServiceRequest, UserProfile, ComplaintResponse } from "./types";

export const useAdminDashboard = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    recentComplaints,
    loading: complaintsLoading,
    fetchRecentComplaints,
    fetchAllComplaints,
    updateComplaintStatus,
    respondToComplaint,
    fetchComplaintResponses
  } = useComplaints();

  const {
    recentRequests,
    loading: requestsLoading,
    fetchRecentRequests,
    fetchAllRequests
  } = useServiceRequests();

  const {
    userProfiles,
    loading: usersLoading,
    fetchUserProfiles
  } = useUserProfiles();

  // Fetch data when the component is mounted
  useEffect(() => {
    let isMounted = true;
    
    const initializeDashboard = async () => {
      try {
        setError(null);
        console.log("Initializing dashboard...");
        
        // Fetch only essential data first
        await Promise.race([
          fetchDashboardData(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
          )
        ]);
        
        if (isMounted) {
          console.log("Dashboard initialized successfully");
        }
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        if (isMounted) {
          setError("Gagal memuat data dashboard");
        }
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
        }
      }
    };

    initializeDashboard();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      
      // Fetch data in parallel but with timeout
      const promises = [
        fetchRecentComplaints(),
        fetchRecentRequests()
      ];
      
      await Promise.allSettled(promises);
      console.log("Dashboard data fetched successfully");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  };

  return {
    // Complaints
    recentComplaints,
    fetchAllComplaints,
    updateComplaintStatus,
    respondToComplaint,
    fetchComplaintResponses,

    // Requests
    recentRequests,
    fetchAllRequests,

    // Users
    userProfiles,
    usersLoading,
    fetchUserProfiles,

    // General
    loading: complaintsLoading || requestsLoading,
    isInitialLoading,
    error,
    fetchDashboardData,
  };
};
