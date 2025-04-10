import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Phone, Recycle, AlertTriangle, User, Mail, MapPin, ClipboardList } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const [activeRequestTab, setActiveRequestTab] = useState<string>("list");
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();
  
  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    setActiveRequestTab("form");
  };
  
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Permohonan Terkirim",
      description: `Permohonan ${selectedService} Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`,
    });
    setActiveRequestTab("list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Layanan Masyarakat</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan untuk membantu masyarakat dalam pelaporan dan konsultasi terkait lingkungan hidup.
          </p>
        </div>

        <Tabs defaultValue="complaint" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="complaint" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Pengaduan
            </TabsTrigger>
            <TabsTrigger value="consultation" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Konsultasi
            </TabsTrigger>
            <TabsTrigger value="request" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> Permohonan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="complaint">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-800">Formulir Pengaduan Lingkungan</CardTitle>
                <CardDescription>
                  Laporkan masalah lingkungan di sekitar Anda seperti pembuangan sampah ilegal, pencemaran air, atau polusi udara.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
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
                    <label htmlFor="location" className="text-sm font-medium">Lokasi Kejadian</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input id="location" placeholder="Alamat lengkap lokasi kejadian" className="rounded-l-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="complaint-type" className="text-sm font-medium">Jenis Pengaduan</label>
                    <select id="complaint-type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled selected>Pilih jenis pengaduan</option>
                      <option value="trash">Pembuangan Sampah Ilegal</option>
                      <option value="water">Pencemaran Air</option>
                      <option value="air">Polusi Udara</option>
                      <option value="noise">Polusi Suara</option>
                      <option value="forest">Kerusakan Hutan/Taman</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Deskripsi Pengaduan</label>
                    <Textarea id="description" placeholder="Jelaskan secara detail masalah lingkungan yang Anda temui..." rows={5} />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">Lampiran Foto/Dokumen (opsional)</label>
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                      <div className="text-center">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Klik atau seret file ke area ini untuk mengunggah</p>
                        <p className="text-xs text-gray-400">JPG, PNG, atau PDF (maks. 5MB)</p>
                        <input type="file" className="hidden" />
                        <Button variant="outline" size="sm" className="mt-2">Pilih File</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">Kirim Pengaduan</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Konsultasi Lingkungan</CardTitle>
                  <CardDescription>
                    Konsultasikan masalah lingkungan dengan para ahli kami melalui berbagai saluran komunikasi.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Phone className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">Hotline Lingkungan</h3>
                        <p className="text-sm text-gray-600">Senin - Jumat, 08.00 - 16.00 WIB</p>
                        <p className="text-green-600 font-medium">0800-1234-5678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Mail className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">Email Konsultasi</h3>
                        <p className="text-sm text-gray-600">Respon dalam 1-2 hari kerja</p>
                        <p className="text-green-600 font-medium">konsultasi@dlh.go.id</p>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">Jadwalkan Konsultasi Online</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Jadwal Konsultasi Tatap Muka</CardTitle>
                  <CardDescription>
                    Konsultasi langsung dengan ahli lingkungan di kantor Dinas Lingkungan Hidup.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-green-800">Jam Layanan Konsultasi</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Senin - Kamis</span>
                          <span>09.00 - 15.00 WIB</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Jumat</span>
                          <span>09.00 - 14.00 WIB</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sabtu, Minggu & Libur Nasional</span>
                          <span>Tutup</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-green-800">Topik Konsultasi</h3>
                      <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                        <li>Pengelolaan Sampah</li>
                        <li>Izin Lingkungan</li>
                        <li>Analisis Mengenai Dampak Lingkungan (AMDAL)</li>
                        <li>Konservasi Air dan Energi</li>
                        <li>Mitigasi Perubahan Iklim</li>
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full text-green-600 hover:bg-green-50">Lihat Detail Lokasi</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="request">
            {activeRequestTab === "list" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Permohonan Layanan</CardTitle>
                  <CardDescription>
                    Ajukan permohonan untuk layanan lingkungan seperti pengangkutan sampah khusus, peminjaman peralatan, atau edukasi lingkungan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Recycle className="h-5 w-5 text-green-600" /> Pengangkutan Sampah
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">Layanan pengangkutan sampah khusus untuk kegiatan berskala besar.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-green-600 hover:bg-green-50"
                          onClick={() => handleServiceRequest("Pengangkutan Sampah")}
                        >
                          Ajukan Permohonan
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" /> Edukasi Lingkungan
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">Permohonan untuk kegiatan sosialisasi dan edukasi lingkungan.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-green-600 hover:bg-green-50"
                          onClick={() => handleServiceRequest("Edukasi Lingkungan")}
                        >
                          Ajukan Permohonan
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <ClipboardList className="h-5 w-5 text-green-600" /> Rekomendasi Teknis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">Permohonan rekomendasi teknis untuk izin lingkungan.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-green-600 hover:bg-green-50"
                          onClick={() => handleServiceRequest("Rekomendasi Teknis")}
                        >
                          Ajukan Permohonan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Persyaratan Umum</h3>
                    <ul className="space-y-1 text-sm list-disc list-inside text-gray-600">
                      <li>Surat permohonan resmi dari institusi/organisasi/masyarakat.</li>
                      <li>Dokumen identitas pemohon (KTP/SIM/Paspor).</li>
                      <li>Rincian kegiatan atau layanan yang dimohonkan.</li>
                      <li>Surat keterangan dari RT/RW setempat (untuk permohonan individu).</li>
                      <li>Dokumen pendukung lainnya sesuai dengan jenis layanan.</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-2">
                      Catatan: Persyaratan spesifik untuk masing-masing layanan dapat berbeda. Silakan lihat detail pada halaman masing-masing layanan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Formulir Permohonan {selectedService}</CardTitle>
                  <CardDescription>
                    Isi formulir di bawah ini untuk mengajukan permohonan {selectedService.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmitRequest}>
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
                      <label htmlFor="location" className="text-sm font-medium">Alamat</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <Input id="location" placeholder="Alamat lengkap" className="rounded-l-none" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</label>
                      <Input id="phone" placeholder="Masukkan nomor telepon Anda" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="request-date" className="text-sm font-medium">Tanggal Permohonan</label>
                      <Input id="request-date" type="date" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">Detail Permohonan</label>
                      <Textarea id="description" placeholder="Jelaskan secara detail permohonan Anda..." rows={5} required />
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
                        onClick={() => setActiveRequestTab("list")}
                      >
                        Kembali
                      </Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                        Kirim Permohonan
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
