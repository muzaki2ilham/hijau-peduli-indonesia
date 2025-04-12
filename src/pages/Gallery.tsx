
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Play } from "lucide-react";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import VideoGrid from "@/components/gallery/VideoGrid";
import { photos, videos } from "@/components/gallery/galleryData";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  
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
