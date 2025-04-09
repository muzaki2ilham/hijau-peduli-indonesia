
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Play, Filter } from "lucide-react";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  
  const photos = [
    {
      id: 1,
      title: "Penanaman Pohon di Taman Kota",
      category: "kegiatan",
      date: "15 Maret 2025",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 2,
      title: "Pembersihan Pantai Bersama Komunitas",
      category: "kegiatan",
      date: "22 Februari 2025",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 3,
      title: "Workshop Daur Ulang Sampah Plastik",
      category: "edukasi",
      date: "5 Januari 2025",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 4,
      title: "Sosialisasi Pengelolaan Sampah di Sekolah",
      category: "edukasi",
      date: "18 Desember 2024",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 5,
      title: "Pelestarian Mangrove di Pesisir",
      category: "konservasi",
      date: "10 November 2024",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 6,
      title: "Pengembangan Taman Kota",
      category: "konservasi",
      date: "5 Oktober 2024",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 7,
      title: "Kampanye Lingkungan Bersih",
      category: "kampanye",
      date: "20 September 2024",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 8,
      title: "Seminar Lingkungan Hidup",
      category: "edukasi",
      date: "15 Agustus 2024",
      imageUrl: "https://via.placeholder.com/400x300",
    },
  ];
  
  const videos = [
    {
      id: 1,
      title: "Dokumenter: Hutan Indonesia",
      category: "dokumenter",
      duration: "15:30",
      thumbnailUrl: "https://via.placeholder.com/400x225",
    },
    {
      id: 2,
      title: "Tutorial Pembuatan Kompos",
      category: "tutorial",
      duration: "08:45",
      thumbnailUrl: "https://via.placeholder.com/400x225",
    },
    {
      id: 3,
      title: "Kampanye Lingkungan Bersih",
      category: "kampanye",
      duration: "03:20",
      thumbnailUrl: "https://via.placeholder.com/400x225",
    },
    {
      id: 4,
      title: "Laporan Kegiatan Penanaman Pohon",
      category: "kegiatan",
      duration: "05:15",
      thumbnailUrl: "https://via.placeholder.com/400x225",
    },
  ];
  
  const filteredPhotos = filter === "all" 
    ? photos 
    : photos.filter(photo => photo.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Galeri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dokumentasi kegiatan dan kampanye lingkungan hidup yang telah dilaksanakan oleh Dinas Lingkungan Hidup.
          </p>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Image className="h-4 w-4" /> Foto
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Play className="h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filter:
              </span>
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Semua
              </Button>
              <Button 
                variant={filter === "kegiatan" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("kegiatan")}
                className={filter === "kegiatan" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Kegiatan
              </Button>
              <Button 
                variant={filter === "edukasi" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("edukasi")}
                className={filter === "edukasi" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Edukasi
              </Button>
              <Button 
                variant={filter === "konservasi" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("konservasi")}
                className={filter === "konservasi" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Konservasi
              </Button>
              <Button 
                variant={filter === "kampanye" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter("kampanye")}
                className={filter === "kampanye" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Kampanye
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-green-800 line-clamp-2">{photo.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{photo.date}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Tidak ada foto yang sesuai dengan filter yang dipilih.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => setFilter("all")}
                >
                  Lihat Semua Foto
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48 bg-gray-200">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 rounded-full p-3">
                        <Play className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-green-800">{video.title}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {video.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
