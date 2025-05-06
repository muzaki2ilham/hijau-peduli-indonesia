
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface DepartmentInfo {
  id: string;
  title: string;
  content: string;
  type: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useDepartmentInfo = () => {
  const [departmentInfo, setDepartmentInfo] = useState<DepartmentInfo[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<DepartmentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDepartmentInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('department_info')
        .select('*')
        .order('type', { ascending: true });

      if (error) {
        throw error;
      }

      setDepartmentInfo(data || []);
    } catch (error: any) {
      toast({
        title: 'Error saat memuat informasi departemen',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createDepartmentInfo = async (infoData: Omit<DepartmentInfo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('department_info')
        .insert(infoData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Informasi berhasil dibuat',
        description: 'Informasi departemen baru telah ditambahkan',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat membuat informasi',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateDepartmentInfo = async (id: string, infoData: Partial<DepartmentInfo>) => {
    try {
      const { data, error } = await supabase
        .from('department_info')
        .update(infoData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Informasi berhasil diperbarui',
        description: 'Informasi departemen telah diperbarui',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat memperbarui informasi',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteDepartmentInfo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('department_info')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Informasi berhasil dihapus',
        description: 'Informasi departemen telah dihapus',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error saat menghapus informasi',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `department/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
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
    fetchDepartmentInfo();
  }, []);

  return {
    departmentInfo,
    loading,
    selectedInfo,
    setSelectedInfo,
    fetchDepartmentInfo,
    createDepartmentInfo,
    updateDepartmentInfo,
    deleteDepartmentInfo,
    uploadImage
  };
};
