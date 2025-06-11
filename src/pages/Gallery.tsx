
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Play, Loader2 } from "lucide-react";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import VideoGrid from "@/components/gallery/VideoGrid";
import { useGalleryItems } from "@/pages/Admin/hooks/useGalleryItems";

interface Photo {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

interface Video {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
}

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  // Mengambil data galeri yang telah ditambahkan admin dari database
  const { galleryItems, loading } = useGalleryItems();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Convert data galeri dari database ke format yang dibutuhkan komponen
  const photos: Photo[] = galleryItems
    .filter(item => item.type === 'photo')
    .map(item => ({
      id: parseInt(item.id),
      title: item.title,
      category: item.category,
      date: item.date || new Date(item.created_at).toLocaleDateString('id-ID'),
      imageUrl: item.url
    }));

  const videos: Video[] = galleryItems
    .filter(item => item.type === 'video')
    .map(item => ({
      id: parseInt(item.id),
      title: item.title,
      category: item.category,
      duration: item.duration || '0:00',
      thumbnailUrl: item.thumbnail_url || item.url
    }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <GalleryHeader />

        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada konten galeri tersedia</h3>
            <p className="text-gray-500">Galeri akan segera diisi dengan konten menarik. Silakan kembali lagi nanti.</p>
          </div>
        ) : (
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Foto ({photos.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="h-4 w-4" /> Video ({videos.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos">
              {photos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Belum ada foto yang ditambahkan.</p>
                </div>
              ) : (
                <PhotoGrid 
                  photos={photos} 
                  filter={filter} 
                  setFilter={setFilter} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="videos">
              {videos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Belum ada video yang ditambahkan.</p>
                </div>
              ) : (
                <VideoGrid videos={videos} />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Gallery;
