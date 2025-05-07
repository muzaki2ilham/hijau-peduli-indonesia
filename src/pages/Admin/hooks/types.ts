
// Common type definitions for admin hooks

export interface Complaint {
  id: string;
  name: string;
  complaint_type: string;
  status: string;
  location: string;
  description: string;
  email: string;
  user_id: string | null;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  service_type: string;
  status: string;
  request_date: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  user_id: string | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export interface ComplaintResponse {
  id: string;
  complaint_id: string;
  response_text: string;
  created_at: string;
  admin_name: string;
}
