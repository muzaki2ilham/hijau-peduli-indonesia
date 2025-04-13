
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequestData, submitServiceRequest } from "@/services/requestService";

export const useRequestForm = (selectedService: string, onSuccess: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<Omit<ServiceRequestData, 'service_type'>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    request_date: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.address || !formData.request_date || !formData.description) {
      toast({
        title: "Formulir Tidak Lengkap",
        description: "Mohon lengkapi semua bidang yang diperlukan.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: user?.email || "",
      phone: "",
      address: "",
      request_date: "",
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = await submitServiceRequest(
      { ...formData, service_type: selectedService },
      user?.id
    );
    
    if (result.success) {
      toast({
        title: "Permohonan Terkirim",
        description: `Permohonan ${selectedService} Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`,
      });
      resetForm();
      onSuccess();
    } else {
      toast({
        title: "Terjadi Kesalahan",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    user
  };
};
