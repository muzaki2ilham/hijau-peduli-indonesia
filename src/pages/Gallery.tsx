
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Play, Loader2 } from "lucide-react";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import VideoGrid from "@/components/gallery/VideoGrid";
import { supabase } from "@/integrations/supabase/client";

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
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery items:', error);
        return;
      }

      if (data) {
        const photoData: Photo[] = data
          .filter(item => item.type === 'photo')
          .map(item => ({
            id: parseInt(item.id),
            title: item.title,
            category: item.category,
            date: item.date || new Date(item.created_at).toLocaleDateString('id-ID'),
            imageUrl: item.url
          }));

        const videoData: Video[] = data
          .filter(item => item.type === 'video')
          .map(item => ({
            id: parseInt(item.id),
            title: item.title,
            category: item.category,
            duration: item.duration || '0:00',
            thumbnailUrl: item.thumbnail_url || item.url
          }));

        setPhotos(photoData);
        setVideos(videoData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <GalleryHeader />

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
            <PhotoGrid 
              photos={photos} 
              filter={filter} 
              setFilter={setFilter} 
            />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideoGrid videos={videos} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
