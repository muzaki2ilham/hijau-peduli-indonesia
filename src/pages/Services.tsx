
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from '@/hooks/use-toast';

const Services = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    console.log({ name, email, phone, complaintType, location, description, file });
    
    // Show success toast
    toast({
      title: "Laporan Terkirim",
      description: "Terima kasih atas laporan Anda. Kami akan segera menindaklanjuti.",
      variant: "default",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setComplaintType("");
    setLocation("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Layanan Masyarakat</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Dinas Lingkungan Hidup menyediakan berbagai layanan untuk masyarakat, termasuk pelaporan masalah lingkungan dan konsultasi.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center">Layanan yang Kami Sediakan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Pelaporan Masalah Lingkungan</h3>
                  <p className="text-gray-600 mb-4">
                    Laporkan masalah lingkungan seperti pembuangan sampah ilegal, pencemaran air, atau kerusakan lingkungan lainnya menggunakan formulir online kami.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Konsultasi Lingkungan</h3>
                  <p className="text-gray-600 mb-4">
                    Dapatkan bantuan dan saran dari ahli lingkungan kami terkait permasalahan lingkungan yang Anda hadapi atau pertanyaan umum tentang lingkungan.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Izin Lingkungan</h3>
                  <p className="text-gray-600 mb-4">
                    Informasi dan panduan tentang proses permohonan izin lingkungan untuk kegiatan usaha atau proyek yang berdampak pada lingkungan.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Kunjungan Edukasi</h3>
                  <p className="text-gray-600 mb-4">
                    Layanan kunjungan edukasi ke fasilitas pengelolaan lingkungan untuk sekolah, komunitas, atau instansi lain yang ingin belajar lebih banyak tentang praktik lingkungan yang baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complaint Form */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center">Formulir Pengaduan Lingkungan</h2>
              <p className="text-center text-gray-600 mb-10">
                Gunakan formulir di bawah ini untuk melaporkan masalah lingkungan yang Anda temui. Tim kami akan segera menindaklanjuti laporan Anda.
              </p>
              
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
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
                  
                  <div>
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="complaint-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Jenis Pengaduan <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="complaint-type"
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Pilih jenis pengaduan</option>
                      <option value="waste">Pembuangan Sampah Ilegal</option>
                      <option value="pollution">Pencemaran Lingkungan</option>
                      <option value="deforestation">Penebangan Liar</option>
                      <option value="noise">Polusi Suara</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi Kejadian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Alamat atau deskripsi lokasi"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Masalah <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Jelaskan secara detail masalah lingkungan yang Anda temui"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                    Lampiran (Opsional)
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Unggah foto, video, atau dokumen pendukung (maks. 5MB)
                  </p>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn-primary px-8">
                    Kirim Pengaduan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Hubungi Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Telepon</h3>
                <p className="text-gray-600">(021) 123-4567</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Email</h3>
                <p className="text-gray-600">info@dinaslingkunganhidup.go.id</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Alamat</h3>
                <p className="text-gray-600">Jl. Lingkungan Hidup No. 123, Kota Hijau, Indonesia 12345</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
