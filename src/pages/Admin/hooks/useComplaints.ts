
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Complaint, ComplaintResponse } from "./types";

export const useComplaints = () => {
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentComplaints();
  }, []);

  const fetchRecentComplaints = async () => {
    setLoading(true);
    try {
      console.log("Fetching recent complaints...");
      
      // Fetch recent complaints
      const { data: complaints, error: complaintsError } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (complaintsError) {
        console.error("Error fetching complaints:", complaintsError);
        throw complaintsError;
      }
      
      console.log("Fetched complaints:", complaints?.length || 0);
      setRecentComplaints(complaints || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllComplaints = async (): Promise<Complaint[]> => {
    try {
      console.log("Fetching all complaints...");
      // Fetch all complaints
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching all complaints:", error);
        throw error;
      }
      
      console.log("Fetched all complaints:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Error fetching all complaints:', error);
      return [];
    }
  };

  const updateComplaintStatus = async (id: string, status: string): Promise<boolean> => {
    try {
      // Call the edge function to update status
      const { data, error } = await supabase
        .functions.invoke('update-complaint-status', {
          body: { id, status }
        });
      
      if (error) throw error;
      
      // Update local state
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === id ? { ...complaint, status } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error updating complaint status:', error);
      return false;
    }
  };
  
  const respondToComplaint = async (complaintId: string, responseText: string, adminName: string): Promise<boolean> => {
    try {
      // Call the edge function to respond to complaint
      const { data, error } = await supabase
        .functions.invoke('respond-to-complaint', {
          body: {
            complaintId,
            responseText,
            adminName
          }
        });
      
      if (error) throw error;
      
      // Update local state - mark the complaint as responded
      setRecentComplaints(prev => 
        prev.map(complaint => complaint.id === complaintId ? { ...complaint, status: 'responded' } : complaint)
      );
      
      return true;
    } catch (error) {
      console.error('Error responding to complaint:', error);
      return false;
    }
  };
  
  const fetchComplaintResponses = async (complaintId: string): Promise<ComplaintResponse[]> => {
    try {
      // Call the edge function to get responses
      const { data, error } = await supabase
        .functions.invoke('complaint-responses', {
          body: { complaintId }
        });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching complaint responses:', error);
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
