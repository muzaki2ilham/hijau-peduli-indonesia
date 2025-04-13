
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Mail, MapPin } from "lucide-react";
import { ComplaintFormData } from "./types";

interface ComplaintFormProps {
  formData: ComplaintFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  isUserEmailReadOnly: boolean;
  selectedFileName: string | null;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handleFileChange,
  isSubmitting,
  isUserEmailReadOnly,
  selectedFileName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
              readOnly={isUserEmailReadOnly}
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
        <div 
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={triggerFileInput}
        >
          <div className="text-center">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {selectedFileName 
                ? `File terpilih: ${selectedFileName}` 
                : "Klik atau seret file ke area ini untuk mengunggah"}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, atau PDF (maks. 5MB)</p>
            <input 
              ref={fileInputRef}
              type="file" 
              id="file"
              className="hidden" 
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <Button variant="outline" size="sm" className="mt-2" type="button">
              {selectedFileName ? "Ubah File" : "Pilih File"}
            </Button>
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
  );
};

export default ComplaintForm;
