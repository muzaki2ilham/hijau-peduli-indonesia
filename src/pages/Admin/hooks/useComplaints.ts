
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Complaint, ComplaintResponse } from "./types";

export const useComplaints = () => {
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentComplaints = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Mengambil SEMUA data pengaduan...");
      
      // Ambil SEMUA pengaduan tanpa batasan
      const { data: complaints, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (complaintsError) {
        console.error("Error mengambil pengaduan:", complaintsError);
        throw complaintsError;
      }
      
      console.log("Berhasil mengambil pengaduan:", complaints?.length || 0);
      setRecentComplaints(complaints || []);
    } catch (error) {
      console.error('Error mengambil pengaduan:', error);
      setRecentComplaints([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentComplaints();
  }, [fetchRecentComplaints]);

  const fetchAllComplaints = useCallback(async (): Promise<Complaint[]> => {
    try {
      console.log("Mengambil semua pengaduan...");
      // Ambil semua pengaduan tanpa batasan
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error mengambil semua pengaduan:", error);
        throw error;
      }
      
      console.log("Berhasil mengambil semua pengaduan:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Error mengambil semua pengaduan:', error);
      return [];
    }
  }, []);

  const updateComplaintStatus = async (id: string, status: string): Promise<boolean> => {
    try {
      // Panggil fungsi edge untuk memperbarui status
      const { data, error } = await supabase
        .functions.invoke('update-complaint-status', {
          body: { id, status }
        });
      
      if (error) throw error;
      
      // Perbarui state lokal
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === id ? { ...complaint, status } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error memperbarui status pengaduan:', error);
      return false;
    }
  };
  
  const respondToComplaint = async (complaintId: string, responseText: string, adminName: string): Promise<boolean> => {
    try {
      // Panggil fungsi edge untuk merespon pengaduan
      const { data, error } = await supabase
        .functions.invoke('respond-to-complaint', {
          body: {
            complaintId,
            responseText,
            adminName
          }
        });
      
      if (error) throw error;
      
      // Perbarui state lokal - tandai pengaduan sebagai direspon
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === complaintId ? { ...complaint, status: 'responded' } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error merespon pengaduan:', error);
      return false;
    }
  };
  
  const fetchComplaintResponses = async (complaintId: string): Promise<ComplaintResponse[]> => {
    try {
      // Panggil fungsi edge untuk mendapatkan respon
      const { data, error } = await supabase
        .functions.invoke('complaint-responses', {
          body: { complaintId }
        });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error mengambil respon pengaduan:', error);
      return [];
    }
  };

  return {
    recentComplaints,
    loading,
    fetchRecentComplaints,
    fetchAllComplaints,
    updateComplaintStatus,
    respondToComplaint,
    fetchComplaintResponses
  };
};
