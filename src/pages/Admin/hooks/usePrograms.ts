
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

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setPrograms(dummyPrograms);
      setLoading(false);
    }, 500);
  }, []);

  return {
    programs,
    loading
  };
};
