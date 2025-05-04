
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Complaint {
  id: string;
  name: string;
  complaint_type: string;
  status: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  service_type: string;
  status: string;
}

export const useAdminDashboard = () => {
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchDashboardData();
  }, []);

  return {
    recentComplaints,
    recentRequests,
    loading
  };
};
