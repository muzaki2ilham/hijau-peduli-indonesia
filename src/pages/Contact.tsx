
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Users, Info } from "lucide-react";
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    console.log({ name, email, subject, message });
    
    // Show success toast
    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
      variant: "default",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hubungi Kami</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Kami siap membantu Anda. Silakan hubungi kami untuk pertanyaan, saran, atau informasi lebih lanjut tentang Dinas Lingkungan Hidup.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Telepon</h3>
                  <p className="text-gray-600">(021) 123-4567</p>
                  <p className="text-gray-600">Fax: (021) 123-4568</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Email</h3>
                  <p className="text-gray-600">info@dinaslingkunganhidup.go.id</p>
                  <p className="text-gray-600">pengaduan@dinaslingkunganhidup.go.id</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Jam Kerja</h3>
                  <p className="text-gray-600">Senin - Jumat: 08:00 - 16:00</p>
                  <p className="text-gray-600">Sabtu, Minggu & Hari Libur: Tutup</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Kirim Pesan</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subjek <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Pesan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn-primary w-full">
                      Kirim Pesan
                    </button>
                  </form>
                </div>

                {/* Map and Address */}
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-6">Lokasi Kami</h2>
                    
                    <div className="bg-gray-200 rounded-md h-64 mb-6 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-green-600" />
                      <span className="ml-2 text-gray-500">Peta Lokasi</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-800 mb-1">Kantor Pusat</h3>
                        <p className="text-gray-600">
                          Jl. Lingkungan Hidup No. 123<br />
                          Kota Hijau, Indonesia 12345
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-green-800 mb-6">Departemen</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-1">Pengaduan & Layanan Masyarakat</h3>
                          <p className="text-gray-600">pengaduan@dinaslingkunganhidup.go.id</p>
                          <p className="text-gray-600">(021) 123-4567 ext. 101</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-green-800 mb-1">Informasi & Hubungan Masyarakat</h3>
                          <p className="text-gray-600">humas@dinaslingkunganhidup.go.id</p>
                          <p className="text-gray-600">(021) 123-4567 ext. 102</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center">Pertanyaan yang Sering Diajukan</h2>
              
              <div className="mt-10 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Bagaimana cara mengajukan keluhan tentang masalah lingkungan?</h3>
                  <p className="text-gray-600">
                    Anda dapat mengajukan keluhan melalui formulir pengaduan online di halaman Layanan, mengirim email ke pengaduan@dinaslingkunganhidup.go.id, atau menghubungi hotline kami di (021) 123-4567.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Apakah Dinas Lingkungan Hidup menyediakan layanan konsultasi untuk kegiatan usaha?</h3>
                  <p className="text-gray-600">
                    Ya, kami menyediakan layanan konsultasi untuk kegiatan usaha terkait dampak lingkungan, perizinan, dan praktik ramah lingkungan. Silakan hubungi kami untuk informasi lebih lanjut.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Bagaimana cara berpartisipasi dalam program penghijauan?</h3>
                  <p className="text-gray-600">
                    Anda dapat berpartisipasi dalam program penghijauan dengan mendaftar sebagai relawan, mengikuti kegiatan penanaman pohon, atau berdonasi untuk program penghijauan. Informasi lebih lanjut dapat ditemukan di halaman Program.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Apakah ada panduan tentang pengelolaan sampah rumah tangga?</h3>
                  <p className="text-gray-600">
                    Ya, kami menyediakan berbagai panduan dan materi edukasi tentang pengelolaan sampah rumah tangga. Anda dapat mengaksesnya di halaman Edukasi atau menghubungi kami untuk mendapatkan salinan cetak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
