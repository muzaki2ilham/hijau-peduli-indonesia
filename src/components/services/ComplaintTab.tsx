
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ComplaintTab = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Formulir Pengaduan Lingkungan</CardTitle>
        <CardDescription>
          Laporkan masalah lingkungan di sekitar Anda seperti pembuangan sampah ilegal, pencemaran air, atau polusi udara.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <User className="h-4 w-4" />
                </span>
                <Input 
                  id="name" 
                  placeholder="Masukkan nama lengkap Anda" 
                  className="rounded-l-none" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="contoh@email.com" 
                  className="rounded-l-none" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  readOnly={!!user?.email}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Lokasi Kejadian</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <MapPin className="h-4 w-4" />
              </span>
              <Input 
                id="location" 
                placeholder="Alamat lengkap lokasi kejadian" 
                className="rounded-l-none" 
                value={formData.location}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="complaint_type" className="text-sm font-medium">Jenis Pengaduan</label>
            <select 
              id="complaint_type" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.complaint_type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Pilih jenis pengaduan</option>
              <option value="Pembuangan Sampah Ilegal">Pembuangan Sampah Ilegal</option>
              <option value="Pencemaran Air">Pencemaran Air</option>
              <option value="Polusi Udara">Polusi Udara</option>
              <option value="Polusi Suara">Polusi Suara</option>
              <option value="Kerusakan Hutan/Taman">Kerusakan Hutan/Taman</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Deskripsi Pengaduan</label>
            <Textarea 
              id="description" 
              placeholder="Jelaskan secara detail masalah lingkungan yang Anda temui..." 
              rows={5} 
              value={formData.description}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Lampiran Foto/Dokumen (opsional)</label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Klik atau seret file ke area ini untuk mengunggah</p>
                <p className="text-xs text-gray-400">JPG, PNG, atau PDF (maks. 5MB)</p>
                <input type="file" className="hidden" />
                <Button variant="outline" size="sm" className="mt-2" type="button">Pilih File</Button>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Kirim Pengaduan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintTab;
