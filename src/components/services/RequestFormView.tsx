
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RequestFormViewProps {
  selectedService: string;
  onSubmit: () => void;
  onBack: () => void;
}

const RequestFormView: React.FC<RequestFormViewProps> = ({ selectedService, onSubmit, onBack }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using a more generic approach to avoid type issues
      const { error } = await supabase
        .from('service_requests')
        .insert({
          service_type: selectedService,
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          request_date: formData.request_date,
          description: formData.description,
          user_id: user?.id || null,
          // Add recipient email for backend processing
          recipient_email: "vxsiorbest@gmail.com"
        } as any);
      
      if (error) throw error;
      
      toast({
        title: "Permohonan Terkirim",
        description: "Permohonan Anda telah berhasil dikirim. Kami akan memproses dan menghubungi Anda segera.",
      });
      
      // Call the onSubmit callback without passing the event
      onSubmit();
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim permohonan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Formulir Permohonan {selectedService}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
              <Input 
                id="name" 
                placeholder="Masukkan nama lengkap Anda" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="contoh@email.com" 
                value={formData.email}
                onChange={handleChange}
                required 
                readOnly={!!user?.email}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</label>
              <Input 
                id="phone" 
                placeholder="Nomor telepon aktif" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="request_date" className="text-sm font-medium">Tanggal Permintaan</label>
              <Input 
                id="request_date" 
                type="date" 
                value={formData.request_date}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">Alamat Lengkap</label>
            <Input 
              id="address" 
              placeholder="Alamat lengkap Anda" 
              value={formData.address}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Deskripsi Permintaan</label>
            <Textarea 
              id="description" 
              placeholder="Jelaskan secara detail permintaan Anda..." 
              rows={5} 
              value={formData.description}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Lampiran Dokumen (opsional)</label>
            <Input id="file" type="file" />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
            >
              Batal
            </Button>
            <Button 
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestFormView;
