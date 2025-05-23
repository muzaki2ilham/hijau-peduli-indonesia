
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '../hooks/types';
import { UsersTable } from './users/UsersTable';
import { PanelHeader } from './users/PanelHeader';

interface UsersPanelProps {
  users: UserProfile[];
  loading: boolean;
  showAll?: boolean;
  onRefresh?: () => void;
}

const UsersPanel: React.FC<UsersPanelProps> = ({ 
  users, 
  loading,
  showAll = false,
  onRefresh 
}) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        toast({
          title: 'Data diperbarui',
          description: 'Data pengguna telah berhasil diperbarui',
        });
      } catch (error) {
        console.error('Error refreshing data:', error);
        toast({
          title: 'Error',
          description: 'Gagal memperbarui data pengguna',
          variant: 'destructive'
        });
      } finally {
        setIsRefreshing(false);
      }
    }
  };
  
  // Menangani kasus di mana users mungkin undefined
  const displayUsers = users || [];
  
  console.log("UsersPanel menampilkan:", displayUsers.length, "pengguna", "loading:", loading, "refreshing:", isRefreshing);

  return (
    <Card>
      <CardHeader>
        <PanelHeader 
          showAll={showAll}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </CardHeader>
      <CardContent>
        <UsersTable users={displayUsers} loading={loading || isRefreshing} />

        {(!showAll && displayUsers.length > 0 && onRefresh) && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={onRefresh}>
              Lihat Semua Pengguna
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersPanel;
