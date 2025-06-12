
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

  const fetchGalleryItems = async () => {
    setLoading(true);
    setTimeout(() => {
      setGalleryItems(dummyGalleryItems);
      setLoading(false);
    }, 500);
  };

  const createGalleryItem = async (data: Omit<GalleryItem, 'id' | 'created_at'>) => {
    const newItem: GalleryItem = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setGalleryItems(prev => [newItem, ...prev]);
    return true;
  };

  const updateGalleryItem = async (id: string, data: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    return true;
  };

  const deleteGalleryItem = async (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    return true;
  };

  const uploadImage = async (file: File, category?: string) => {
    // Mock upload - return a dummy URL
    return `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=800`;
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return {
    galleryItems,
    loading,
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    uploadImage
  };
};
