
import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { dummyComplaints } from "@/data/dummyComplaints";
import { dummyServiceRequests } from "@/data/dummyServiceRequests";

interface UserStatsLoaderProps {
  userId: string;
  type: 'complaints' | 'requests';
}

export const UserStatsLoader = ({ userId, type }: UserStatsLoaderProps) => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Simulasi delay untuk loading
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Hitung berdasarkan data dummy
        // Karena dummy data tidak memiliki user_id yang sesuai, kita buat simulasi
        const randomCount = Math.floor(Math.random() * 5); // 0-4 untuk simulasi
        setCount(randomCount);
      } catch (error) {
        console.error(`Error in ${type} stats:`, error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, type]);

  if (loading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return <span>{count}</span>;
};
