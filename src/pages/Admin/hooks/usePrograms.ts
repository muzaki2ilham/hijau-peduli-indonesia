
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface Program {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  start_date?: string;
  end_date?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match interface types
      const transformedData: Program[] = data?.map(program => ({
        ...program,
        status: program.status as Program['status']
      })) || [];
      
      setPrograms(transformedData);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProgram = async (program: Omit<Program, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert([program])
        .select();

      if (error) throw error;
      if (data) {
        const transformedProgram: Program = {
          ...data[0],
          status: data[0].status as Program['status']
        };
        setPrograms(prev => [transformedProgram, ...prev]);
      }
      return true;
    } catch (error) {
      console.error('Error creating program:', error);
      return false;
    }
  };

  const updateProgram = async (id: string, updates: Partial<Program>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        const transformedProgram: Program = {
          ...data[0],
          status: data[0].status as Program['status']
        };
        setPrograms(prev => prev.map(program => program.id === id ? transformedProgram : program));
      }
      return true;
    } catch (error) {
      console.error('Error updating program:', error);
      return false;
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPrograms(prev => prev.filter(program => program.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting program:', error);
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    // Mock implementation - you can implement actual file upload later
    console.log('Image upload not implemented yet');
    return null;
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    uploadImage
  };
};
