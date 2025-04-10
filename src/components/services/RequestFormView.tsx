
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RequestFormViewProps {
  selectedService: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const RequestFormView = ({ selectedService, onSubmit, onBack }: RequestFormViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    request_date: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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
        } as any);
      
      if (error) throw error;
      
      // Call the parent onSubmit to show toast and navigate back
      onSubmit(e);
      
      // Reset form data
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        request_date: "",
        description: ""
      });
    } catch (error) {
      console.error("Error submitting service request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Formulir Permohonan {selectedService}</CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk mengajukan permohonan {selectedService.toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
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
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">Alamat</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <MapPin className="h-4 w-4" />
              </span>
              <Input 
                id="address" 
                placeholder="Alamat lengkap" 
                className="rounded-l-none" 
                value={formData.address}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</label>
            <Input 
              id="phone" 
              placeholder="Masukkan nomor telepon Anda" 
              value={formData.phone}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="request_date" className="text-sm font-medium">Tanggal Permohonan</label>
            <Input 
              id="request_date" 
              type="date" 
              value={formData.request_date}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Detail Permohonan</label>
            <Textarea 
              id="description" 
              placeholder="Jelaskan secara detail permohonan Anda..." 
              rows={5} 
              value={formData.description}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Lampiran Dokumen (opsional)</label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Klik atau seret file ke area ini untuk mengunggah</p>
                <p className="text-xs text-gray-400">PDF, DOCX, atau JPEG (maks. 5MB)</p>
                <input type="file" className="hidden" />
                <Button variant="outline" size="sm" className="mt-2" type="button">Pilih File</Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Saya menyetujui bahwa data saya akan diproses sesuai dengan kebijakan privasi.
              </label>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onBack}
            >
              Kembali
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700"
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
