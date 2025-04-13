
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ComplaintFormData } from "./types";
import { submitComplaint } from "@/services/complaintService";

export const useComplaintForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran file tidak boleh melebihi 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format File Tidak Didukung",
          description: "Hanya file JPG, PNG, atau PDF yang diperbolehkan.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFile(null);
      setSelectedFileName(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.location || !formData.complaint_type || !formData.description) {
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
      name: user?.email ? formData.name : "",
      email: user?.email || "",
      location: "",
      complaint_type: "",
      description: "",
    });
    setSelectedFile(null);
    setSelectedFileName(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = await submitComplaint(formData, user?.id, selectedFile);
    
    if (result.success) {
      toast({
        title: "Pengaduan Terkirim",
        description: "Pengaduan Anda telah berhasil dikirim dan sedang diproses. Kami akan meninjau dan menindaklanjuti segera.",
      });
      resetForm();
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
    handleFileChange,
    handleSubmit,
    isSubmitting,
    user,
    selectedFileName
  };
};
