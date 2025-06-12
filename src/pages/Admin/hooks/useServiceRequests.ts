
import { useState, useEffect } from "react";
import { dummyServiceRequests } from "@/data/dummyServiceRequests";

export interface ServiceRequest {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  description: string;
  request_date: string;
  status: 'pending' | 'approved' | 'in_review' | 'completed' | 'rejected';
  attachments?: string[];
  admin_response?: string;
  created_at: string;
  updated_at: string;
}

export const useServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceRequests = async () => {
    setLoading(true);
    // Simulasi loading
    setTimeout(() => {
      setServiceRequests(dummyServiceRequests);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  return {
    serviceRequests,
    loading,
    fetchServiceRequests
  };
};
