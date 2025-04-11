
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
      // Using a more generic approach to avoid type issues
      const { error } = await supabase
        .from('complaints')
        .insert({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          complaint_type: formData.complaint_type,
          description: formData.description,
          user_id: user?.id || null,
          // Add recipient email for backend processing
          recipient_email: "vxsiorbest@gmail.com"
        } as any);
      
      if (error) throw error;
      
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
