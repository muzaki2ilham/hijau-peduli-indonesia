
// This file now combines all the individual hooks for easier usage throughout the admin components

import { useComplaints } from "./useComplaints";
import { useServiceRequests } from "./useServiceRequests";
import { useUserProfiles } from "./useUserProfiles";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
export type { Complaint, ServiceRequest, UserProfile, ComplaintResponse } from "./types";

export const useAdminDashboard = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
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
    let timeoutId: number;
    
    const initializeDashboard = async () => {
      try {
        setError(null);
        console.log("Initializing dashboard...");
        
        // Set a timeout to prevent infinite loading
        timeoutId = window.setTimeout(() => {
          if (isMounted && isInitialLoading) {
            console.error("Dashboard initialization timed out");
            setError("Waktu pengambilan data habis. Silakan refresh halaman.");
            setIsInitialLoading(false);
            toast({
              title: "Terjadi kesalahan",
              description: "Timeout saat memuat data dashboard. Silakan coba lagi.",
              variant: "destructive"
            });
          }
        }, 15000); // 15 second timeout
        
        // Fetch essential data
        await fetchDashboardData();
        
        if (isMounted) {
          console.log("Dashboard initialized successfully");
          setIsInitialLoading(false);
        }
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        if (isMounted) {
          setError("Gagal memuat data dashboard. Silakan coba lagi.");
          setIsInitialLoading(false);
          toast({
            title: "Terjadi kesalahan",
            description: "Gagal memuat data dashboard",
            variant: "destructive"
          });
        }
      } finally {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
      }
    };

    initializeDashboard();
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      
      // Fetch data in parallel with individual timeouts
      await Promise.allSettled([
        Promise.race([
          fetchRecentComplaints(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Complaints fetch timeout')), 8000)
          )
        ]),
        Promise.race([
          fetchRecentRequests(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Requests fetch timeout')), 8000)
          )
        ])
      ]);
      
      console.log("Dashboard data fetched successfully");
      
      // Also try to fetch user profiles but don't wait for it
      fetchUserProfiles().catch(err => console.error("Error fetching user profiles:", err));
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
