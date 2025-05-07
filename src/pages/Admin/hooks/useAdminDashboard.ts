
// This file now combines all the individual hooks for easier usage throughout the admin components

import { useComplaints } from "./useComplaints";
import { useServiceRequests } from "./useServiceRequests";
import { useUserProfiles } from "./useUserProfiles";
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

  const fetchDashboardData = async () => {
    await Promise.all([
      fetchRecentComplaints(),
      fetchRecentRequests()
    ]);
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
    fetchDashboardData,
  };
};
