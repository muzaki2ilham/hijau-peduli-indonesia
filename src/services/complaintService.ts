
import { supabase } from "@/integrations/supabase/client";
import { ComplaintFormData } from "@/components/services/complaint/types";

export interface SubmissionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const submitComplaint = async (
  formData: ComplaintFormData,
  userId: string | null,
  file: File | null
): Promise<SubmissionResponse> => {
  try {
    let fileUrl: string | null = null;
    
    // Upload file if provided
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${userId || 'anonymous'}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('complaints')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
      } else if (uploadData) {
        // Get public URL
        const { data: urlData } = supabase
          .storage
          .from('complaints')
          .getPublicUrl(filePath);
        
        fileUrl = urlData.publicUrl;
      }
    }
    
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
        status: "in progress",
        attachments: fileUrl ? [fileUrl] : null
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
            status: "in progress",
            attachment: fileUrl
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
