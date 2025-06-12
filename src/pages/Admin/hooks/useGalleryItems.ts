
import { useState, useEffect } from "react";
import { dummyGalleryItems } from "@/data/dummyGalleryItems";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  type: 'photo' | 'video';
  category: string;
  url: string;
  thumbnail_url?: string;
  date?: string;
  duration?: string;
  created_at: string;
}

export const useGalleryItems = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setGalleryItems(dummyGalleryItems);
      setLoading(false);
    }, 500);
  }, []);

  return {
    galleryItems,
    loading
  };
};
