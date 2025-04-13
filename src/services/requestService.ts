
import { supabase } from "@/integrations/supabase/client";

export interface ServiceRequestData {
  name: string;
  email: string;
  phone: string;
  address: string;
  request_date: string;
  description: string;
  service_type: string;
}

export interface SubmissionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const submitServiceRequest = async (
  formData: ServiceRequestData,
  userId: string | null
): Promise<SubmissionResponse> => {
  try {
    // Insert the data into Supabase
    const { data, error } = await supabase
      .from('service_requests')
      .insert({
        service_type: formData.service_type,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        request_date: formData.request_date,
        description: formData.description,
        user_id: userId || null,
        status: "in progress"
      })
      .select();
    
    if (error) throw error;
    
    // Send email notification
    try {
      const response = await fetch('https://odenbatdqohfxgjibkff.supabase.co/functions/v1/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          record: {
            ...formData,
            user_id: userId || null,
            status: "in progress"
          },
          type: 'service_request'
        })
      });
      
      if (!response.ok) {
        console.error('Email notification failed:', await response.text());
      }
    } catch (notificationError) {
      console.error('Error sending notification:', notificationError);
      // Continue with success even if notification fails
    }
    
    return { success: true, data };
  } catch (error: any) {
    console.error("Error submitting service request:", error);
    return { 
      success: false, 
      error: error.message || "Gagal mengirim permohonan. Silakan coba lagi nanti." 
    };
  }
};
