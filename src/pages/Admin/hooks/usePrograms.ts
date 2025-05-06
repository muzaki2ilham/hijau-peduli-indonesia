
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Program {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  status: 'active' | 'inactive' | 'completed';
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to ensure it matches the Program type
      setPrograms((data || []).map(item => ({
        ...item,
        status: item.status as 'active' | 'inactive' | 'completed'
      })));
    } catch (error: any) {
      toast({
        title: 'Error saat memuat program',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createProgram = async (programData: Omit<Program, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert(programData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Program berhasil dibuat',
        description: 'Program baru telah berhasil ditambahkan',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat membuat program',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateProgram = async (id: string, programData: Partial<Program>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .update(programData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Program berhasil diperbarui',
        description: 'Informasi program telah diperbarui',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat memperbarui program',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Program berhasil dihapus',
        description: 'Program telah dihapus dari sistem',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error saat menghapus program',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `programs/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
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
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    selectedProgram,
    setSelectedProgram,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    uploadImage
  };
};
