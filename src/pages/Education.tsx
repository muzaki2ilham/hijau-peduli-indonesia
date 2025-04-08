
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const educationResources = [
  {
    id: "1",
    title: "Pengelolaan Sampah Rumah Tangga",
    description: "Panduan lengkap tentang cara mengelola sampah rumah tangga dengan prinsip 3R (Reduce, Reuse, Recycle).",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    type: "Artikel",
  },
  {
    id: "2",
    title: "Teknik Pembuatan Kompos dari Sampah Organik",
    description: "Langkah-langkah praktis untuk mengubah sampah organik menjadi kompos yang bermanfaat untuk tanaman.",
    image: "https://images.unsplash.com/photo-1621962776642-24eb440ca4e3",
    type: "Video",
  },
  {
    id: "3",
    title: "Konservasi Air: Mengapa Penting?",
    description: "Penjelasan tentang pentingnya konservasi air dan cara-cara sederhana untuk menghemat penggunaan air sehari-hari.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    type: "Artikel",
  },
  {
    id: "4",
    title: "Perubahan Iklim dan Dampaknya pada Lingkungan",
    description: "Informasi komprehensif tentang perubahan iklim, penyebab, dan dampaknya terhadap lingkungan dan kehidupan manusia.",
    image: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1",
    type: "Infografis",
  },
  {
    id: "5",
    title: "Jenis-jenis Energi Terbarukan",
    description: "Pengenalan berbagai jenis energi terbarukan dan potensi pengembangannya di Indonesia.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    type: "Artikel",
  },
  {
    id: "6",
    title: "Cara Membuat Kebun Vertikal di Rumah",
    description: "Panduan praktis untuk membuat kebun vertikal dengan memanfaatkan ruang terbatas di rumah atau apartemen.",
    image: "https://images.unsplash.com/photo-1506903536293-8419449075bc",
    type: "Video",
  },
];

const Education = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Edukasi Lingkungan</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Pelajari berbagai informasi dan panduan tentang isu-isu lingkungan untuk meningkatkan pemahaman dan kesadaran tentang pentingnya menjaga kelestarian alam.
            </p>
          </div>
        </section>

        {/* Featured Resource */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b" 
                    alt="Pengelolaan Sampah" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Panduan Utama
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                    Panduan Lengkap Pengelolaan Sampah untuk Rumah Tangga
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Pelajari cara mengelola sampah rumah tangga dengan efektif menggunakan prinsip 3R (Reduce, Reuse, Recycle). Panduan ini mencakup pemilahan sampah, pengomposan, dan tips untuk mengurangi produksi sampah.
                  </p>
                  <Link
                    to="/education/pengelolaan-sampah"
                    className="btn-primary inline-block"
                  >
                    Baca Panduan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Sumber Edukasi Lingkungan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {educationResources.map((resource) => (
                <div key={resource.id} className="card group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {resource.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <Link 
                      to={`/education/${resource.id}`} 
                      className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
                    >
                      Pelajari selengkapnya
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Online Learning */}
        <section className="py-16 bg-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Kursus Online Gratis
              </h2>
              <p className="text-lg text-green-100 mb-8">
                Dinas Lingkungan Hidup menyediakan kursus online gratis tentang berbagai topik lingkungan. Pelajari langsung dari para ahli dan dapatkan sertifikat setelah menyelesaikan kursus.
              </p>
              <Link to="/education/courses" className="bg-white text-green-700 hover:bg-green-100 font-medium py-3 px-6 rounded-md transition-colors">
                Jelajahi Kursus Kami
              </Link>
            </div>
          </div>
        </section>

        {/* Infographics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Infografis Lingkungan
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Informasi visual yang menarik dan mudah dipahami tentang berbagai isu lingkungan
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1569163139500-66446e2926ba" 
                  alt="Dampak Plastik" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800">Dampak Plastik pada Ekosistem Laut</h3>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef" 
                  alt="Daur Hidup Produk" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800">Daur Hidup Produk dan Dampak Lingkungan</h3>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf" 
                  alt="Jejak Karbon" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800">Jejak Karbon Aktivitas Sehari-hari</h3>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/education/infographics" className="btn-primary inline-block">
                Lihat Semua Infografis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Education;
