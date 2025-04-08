
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "Penanaman Pohon di Taman Kota",
    category: "Kegiatan",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    title: "Konservasi Sumber Air",
    category: "Proyek",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    title: "Kawasan Hutan Kota",
    category: "Lokasi",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    title: "Program Reboisasi",
    category: "Kegiatan",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    title: "Edukasi Lingkungan untuk Anak Sekolah",
    category: "Edukasi",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Pemandangan Alam yang Dilindungi",
    category: "Lokasi",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    title: "Workshop Daur Ulang",
    category: "Kegiatan",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Danau Konservasi",
    category: "Lokasi",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Pemantauan Kualitas Udara",
    category: "Kegiatan",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "Habitat Satwa Liar",
    category: "Lokasi",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    title: "Kerja Bakti Pembersihan Sungai",
    category: "Kegiatan",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    title: "Kampanye Pengurangan Plastik",
    category: "Edukasi",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState("semua");

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const filteredImages = filter === "semua" 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Galeri</h1>
            <p className="text-green-100 text-lg max-w-3xl">
              Dokumentasi visual dari berbagai kegiatan dan program Dinas Lingkungan Hidup dalam melestarikan lingkungan.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filter */}
            <div className="flex flex-wrap justify-center mb-10 gap-2">
              <button 
                onClick={() => setFilter("semua")} 
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "semua" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Semua
              </button>
              <button 
                onClick={() => setFilter("kegiatan")} 
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "kegiatan" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Kegiatan
              </button>
              <button 
                onClick={() => setFilter("proyek")} 
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "proyek" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Proyek
              </button>
              <button 
                onClick={() => setFilter("lokasi")} 
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "lokasi" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Lokasi
              </button>
              <button 
                onClick={() => setFilter("edukasi")} 
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === "edukasi" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Edukasi
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="aspect-square">
                    <img 
                      src={image.src} 
                      alt={image.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium mb-1">{image.title}</h3>
                    <span className="text-green-200 text-sm">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={closeModal}>
                <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                  <button 
                    className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    onClick={closeModal}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="aspect-video">
                    <img 
                      src={selectedImage.src} 
                      alt={selectedImage.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-green-800">{selectedImage.title}</h3>
                    <p className="text-gray-600">{selectedImage.category}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center max-w-3xl mx-auto">
              Video Dokumentasi
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Rekaman video dari berbagai kegiatan dan program Dinas Lingkungan Hidup
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Program Penanaman 1 Juta Pohon</h3>
                  <p className="text-gray-600 text-sm">Dokumentasi kegiatan penanaman pohon yang melibatkan masyarakat dan pemerintah daerah.</p>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Kampanye Lingkungan Hidup Sekolah</h3>
                  <p className="text-gray-600 text-sm">Video edukasi tentang pentingnya menjaga lingkungan untuk siswa sekolah.</p>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Pembersihan Pantai Bersama</h3>
                  <p className="text-gray-600 text-sm">Kegiatan gotong-royong membersihkan sampah di pantai yang melibatkan relawan dari berbagai komunitas.</p>
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

export default Gallery;
