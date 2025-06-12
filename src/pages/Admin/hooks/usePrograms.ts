
import { useState, useEffect } from "react";
import { dummyPrograms } from "@/data/dummyPrograms";

export interface Program {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  start_date?: string;
  end_date?: string;
  image_url?: string;
  created_at: string;
}

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async () => {
    setLoading(true);
    setTimeout(() => {
      setPrograms(dummyPrograms);
      setLoading(false);
    }, 500);
  };

  const createProgram = async (data: Omit<Program, 'id' | 'created_at'>) => {
    const newProgram: Program = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setPrograms(prev => [newProgram, ...prev]);
    return true;
  };

  const updateProgram = async (id: string, data: Partial<Program>) => {
    setPrograms(prev => prev.map(program => 
      program.id === id ? { ...program, ...data } : program
    ));
    return true;
  };

  const deleteProgram = async (id: string) => {
    setPrograms(prev => prev.filter(program => program.id !== id));
    return true;
  };

  const uploadImage = async (file: File) => {
    // Mock upload - return a dummy URL
    return `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=800`;
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
