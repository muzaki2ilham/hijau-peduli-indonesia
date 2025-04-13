
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRequestForm } from "./useRequestForm";

interface RequestFormViewProps {
  selectedService: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const RequestFormView: React.FC<RequestFormViewProps> = ({ 
  selectedService, 
  onSubmit, 
  onBack 
}) => {
  const { 
    formData, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    user 
  } = useRequestForm(selectedService, () => onSubmit(new Event('submit') as unknown as React.FormEvent));

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
