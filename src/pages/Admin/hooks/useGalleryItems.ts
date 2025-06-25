
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

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
  updated_at: string;
}

export const useGalleryItems = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match interface types
      const transformedData: GalleryItem[] = data?.map(item => ({
        ...item,
        type: item.type as GalleryItem['type']
      })) || [];
      
      setGalleryItems(transformedData);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert([item])
        .select();

      if (error) throw error;
      if (data) {
        const transformedItem: GalleryItem = {
          ...data[0],
          type: data[0].type as GalleryItem['type']
        };
        setGalleryItems(prev => [transformedItem, ...prev]);
      }
      return true;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      return false;
    }
  };

  const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        const transformedItem: GalleryItem = {
          ...data[0],
          type: data[0].type as GalleryItem['type']
        };
        setGalleryItems(prev => prev.map(item => item.id === id ? transformedItem : item));
      }
      return true;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      return false;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    // Mock implementation - you can implement actual file upload later
    console.log('Image upload not implemented yet');
    return null;
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
