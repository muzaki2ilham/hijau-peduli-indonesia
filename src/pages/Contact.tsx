
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih atas pesan Anda. Kami akan menghubungi Anda segera.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Informasi Kontak</CardTitle>
                <CardDescription>
                  Berikut adalah berbagai cara untuk menghubungi kami.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Alamat</h3>
                    <p className="text-gray-600">Jl. Lingkungan Hidup No. 123, Kota Jakarta, Indonesia 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telepon</h3>
                    <p className="text-gray-600">(021) 1234-5678</p>
                    <p className="text-gray-600">0800-1234-5678 (Hotline)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@dlh.go.id</p>
                    <p className="text-gray-600">pengaduan@dlh.go.id (Pengaduan)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                    <p className="text-gray-600">Sabtu, Minggu & Hari Libur: Tutup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Peta Lokasi</p>
                  {/* Ini adalah placeholder untuk peta. Dalam implementasi nyata, Anda bisa menggunakan Google Maps atau peta lainnya */}
                </div>
                <Button variant="outline" className="w-full mt-4 text-green-600 hover:bg-green-50">
                  Lihat di Google Maps
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
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
                      <Input id="name" placeholder="Masukkan nama lengkap Anda" className="rounded-l-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input id="email" type="email" placeholder="contoh@email.com" className="rounded-l-none" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <Phone className="h-4 w-4" />
                    </span>
                    <Input id="phone" placeholder="Masukkan nomor telepon Anda" className="rounded-l-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subjek</label>
                  <select id="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
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
                  <Textarea id="message" placeholder="Tulis pesan Anda di sini..." rows={5} />
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms-description"
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded"
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
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">Pertanyaan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-800">Bagaimana cara melaporkan masalah lingkungan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Anda dapat melaporkan masalah lingkungan melalui menu Layanan Masyarakat {'>'}{'>'} Pengaduan
                  di website ini, mengirim email ke pengaduan@dlh.go.id, atau menghubungi hotline kami di 0800-1234-5678.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-800">Apa saja layanan yang disediakan oleh Dinas Lingkungan Hidup?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dinas Lingkungan Hidup menyediakan berbagai layanan seperti pengangkutan sampah, pengolahan limbah,
                  pemantauan kualitas lingkungan, edukasi lingkungan, dan konsultasi lingkungan.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-800">Bagaimana cara mengajukan permohonan izin lingkungan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Untuk mengajukan permohonan izin lingkungan, Anda dapat mengunjungi kantor Dinas Lingkungan Hidup
                  dengan membawa dokumen-dokumen yang diperlukan atau menghubungi kami melalui email untuk informasi lebih lanjut.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-800">Apakah ada program edukasi lingkungan untuk sekolah?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ya, kami memiliki program edukasi lingkungan untuk sekolah yang dapat disesuaikan dengan kebutuhan.
                  Untuk informasi lebih lanjut, silakan hubungi bagian Edukasi Lingkungan kami melalui email atau telepon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
