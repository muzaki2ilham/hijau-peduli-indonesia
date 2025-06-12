
import { useState, useEffect } from "react";
import { dummyComplaints } from "@/data/dummyComplaints";

export interface Complaint {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  location: string;
  complaint_type: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  attachments?: string[];
  admin_response?: string;
  created_at: string;
  updated_at: string;
}

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    // Simulasi loading
    setTimeout(() => {
      setComplaints(dummyComplaints);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return {
    complaints,
    loading,
    fetchComplaints
  };
};
