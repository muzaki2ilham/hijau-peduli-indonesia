
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequest } from "./types";

export const useServiceRequests = () => {
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentRequests = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Mengambil semua permohonan layanan...");
      
      // Ambil semua permohonan layanan tanpa batasan
      const { data: requests, error: requestsError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (requestsError) {
        console.error("Error mengambil permohonan layanan:", requestsError);
        throw requestsError;
      }
      
      console.log("Berhasil mengambil permohonan layanan:", requests?.length || 0);
      setRecentRequests(requests || []);
    } catch (error) {
      console.error('Error mengambil permohonan layanan:', error);
      setRecentRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentRequests();
  }, [fetchRecentRequests]);

  const fetchAllRequests = useCallback(async (): Promise<ServiceRequest[]> => {
    try {
      console.log("Mengambil semua permohonan layanan...");
      // Ambil semua permohonan layanan
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error mengambil semua permohonan layanan:", error);
        throw error;
      }
      
      console.log("Berhasil mengambil semua permohonan layanan:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Error mengambil semua permohonan layanan:', error);
      return [];
    }
  }, []);

  return {
    recentRequests,
    loading,
    fetchRecentRequests,
    fetchAllRequests
  };
};
