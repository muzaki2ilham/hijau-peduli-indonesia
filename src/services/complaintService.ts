
import { supabase } from "@/integrations/supabase/client";
import { ComplaintFormData } from "@/components/services/complaint/types";

export interface SubmissionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const submitComplaint = async (
  formData: ComplaintFormData,
  userId: string | null
): Promise<SubmissionResponse> => {
  try {
    // Insert complaint into database
    const { data, error } = await supabase
      .from('complaints')
      .insert({
        name: formData.name,
        email: formData.email,
        location: formData.location,
        complaint_type: formData.complaint_type,
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
          type: 'complaint'
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
    console.error("Error submitting complaint:", error);
    return { 
      success: false, 
      error: error.message || "Gagal mengirim pengaduan. Silakan coba lagi nanti." 
    };
  }
};
