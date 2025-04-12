
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ComplaintFormData } from "./types";

export const useComplaintForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: "",
    email: "",
    location: "",
    complaint_type: "",
    description: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        setFormData(prev => ({
          ...prev,
          email: data.session.user.email || "",
        }));
      }
    };
    
    getUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.location || !formData.complaint_type || !formData.description) {
      toast({
        title: "Formulir Tidak Lengkap",
        description: "Mohon lengkapi semua bidang yang diperlukan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the complaint into the database
      const { data, error } = await supabase
        .from('complaints')
        .insert({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          complaint_type: formData.complaint_type,
          description: formData.description,
          user_id: user?.id || null
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
              user_id: user?.id || null
            },
            type: 'complaint'
          })
        });
        
        if (!response.ok) {
          console.error('Email notification failed:', await response.text());
        }
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
        // We don't throw here so the user still gets confirmation even if the email fails
      }
      
      toast({
        title: "Pengaduan Terkirim",
        description: "Pengaduan Anda telah berhasil dikirim. Kami akan meninjau dan menindaklanjuti segera.",
      });
      
      // Reset form
      setFormData({
        name: user?.email ? formData.name : "",
        email: user?.email || "",
        location: "",
        complaint_type: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim pengaduan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    user
  };
};
