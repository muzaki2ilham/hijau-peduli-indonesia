
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih atas pesan Anda. Kami akan menghubungi Anda segera.",
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
    setSelectedFileName(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-green-800 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> Kirim Pesan
        </CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk mengirim pesan kepada kami. Kami akan merespons secepatnya.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <User className="h-4 w-4" />
                </span>
                <Input id="name" placeholder="Masukkan nama lengkap Anda" className="rounded-l-none" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <Input id="email" type="email" placeholder="contoh@email.com" className="rounded-l-none" required />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Phone className="h-4 w-4" />
              </span>
              <Input id="phone" placeholder="Masukkan nomor telepon Anda" className="rounded-l-none" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subjek</label>
            <select id="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
              <option value="" disabled selected>Pilih subjek pesan</option>
              <option value="info">Informasi Umum</option>
              <option value="complaint">Pengaduan</option>
              <option value="service">Layanan</option>
              <option value="cooperation">Kerjasama</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Pesan</label>
            <Textarea id="message" placeholder="Tulis pesan Anda di sini..." rows={5} required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Lampiran (opsional)</label>
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
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms-description"
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
          
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Kirim Pesan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
