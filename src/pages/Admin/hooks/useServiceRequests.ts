
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequest } from "./types";

export const useServiceRequests = () => {
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    setLoading(true);
    try {
      console.log("Fetching recent service requests...");
      
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
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
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

  return {
    recentRequests,
    loading,
    fetchRecentRequests,
    fetchAllRequests
  };
};
