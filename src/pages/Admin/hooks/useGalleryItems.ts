
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  type: 'photo' | 'video';
  category: string;
  url: string;
  thumbnail_url: string | null;
  date: string | null;
  duration: string | null;
  created_at: string;
  updated_at: string;
}

export const useGalleryItems = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to ensure it matches the GalleryItem type
      setGalleryItems((data || []).map(item => ({
        ...item,
        type: item.type as 'photo' | 'video'
      })));
    } catch (error: any) {
      toast({
        title: 'Error saat memuat galeri',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert(itemData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Item galeri berhasil dibuat',
        description: 'Item baru telah ditambahkan ke galeri',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat membuat item galeri',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateGalleryItem = async (id: string, itemData: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .update(itemData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Item galeri berhasil diperbarui',
        description: 'Perubahan pada item galeri telah disimpan',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat memperbarui item galeri',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Item galeri berhasil dihapus',
        description: 'Item telah dihapus dari galeri',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error saat menghapus item galeri',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const uploadImage = async (file: File, folder: string = 'gallery') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('website_assets')
        .upload(fileName, file);
        
      if (error) {
        throw error;
      }
      
      const { data } = supabase.storage
        .from('website_assets')
        .getPublicUrl(fileName);
        
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: 'Error saat mengunggah gambar',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return {
    galleryItems,
    loading,
    selectedItem,
    setSelectedItem,
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    uploadImage
  };
};
