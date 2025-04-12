
import React from "react";
import { Button } from "@/components/ui/button";
import MediaCard from "./MediaCard";
import FilterBar from "./FilterBar";

interface Photo {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

interface PhotoGridProps {
  photos: Photo[];
  filter: string;
  setFilter: (filter: string) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, filter, setFilter }) => {
  // Get unique categories for filter buttons
  const categories = [...new Set(photos.map(photo => photo.category))];
  
  // Create friendly category labels
  const categoryLabels: Record<string, string> = {
    "kegiatan": "Kegiatan",
    "edukasi": "Edukasi",
    "konservasi": "Konservasi",
    "kampanye": "Kampanye"
  };
  
  const filteredPhotos = filter === "all" 
    ? photos 
    : photos.filter(photo => photo.category === filter);

  return (
    <>
      <FilterBar 
        currentFilter={filter} 
        onFilterChange={setFilter} 
        categories={categories}
        categoryLabels={categoryLabels}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <MediaCard
            key={photo.id}
            type="photo"
            id={photo.id}
            title={photo.title}
            category={photo.category}
            date={photo.date}
            imageUrl={photo.imageUrl}
          />
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
    </>
  );
};

export default PhotoGrid;
