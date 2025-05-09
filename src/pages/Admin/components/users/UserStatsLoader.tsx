
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from '../../hooks/types';
import { Loader2 } from "lucide-react";

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
        const tableName = type === 'complaints' ? 'complaints' : 'service_requests';
        
        const { data, error } = await supabase
          .from(tableName)
          .select('user_id')
          .eq('user_id', userId);

        if (error) {
          console.error(`Error fetching ${type} stats:`, error);
          setCount(0);
        } else {
          setCount(data?.length || 0);
        }
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
