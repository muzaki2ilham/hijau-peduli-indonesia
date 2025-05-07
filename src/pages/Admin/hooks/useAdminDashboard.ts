
// This file now combines all the individual hooks for easier usage throughout the admin components

import { useComplaints } from "./useComplaints";
import { useServiceRequests } from "./useServiceRequests";
import { useUserProfiles } from "./useUserProfiles";
import { useEffect } from "react";
export type { Complaint, ServiceRequest, UserProfile, ComplaintResponse } from "./types";

export const useAdminDashboard = () => {
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching all dashboard data...");
      await Promise.all([
        fetchRecentComplaints(),
        fetchRecentRequests(),
        fetchUserProfiles()
      ]);
      console.log("Dashboard data fetched successfully");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
    loading: complaintsLoading || requestsLoading || usersLoading,
    fetchDashboardData,
  };
};
