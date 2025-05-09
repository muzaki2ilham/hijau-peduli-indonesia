
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, UserIcon, RefreshCw } from "lucide-react";
import { UserProfile } from '../hooks/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

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
  const [userComplaints, setUserComplaints] = useState<Record<string, number>>({});
  const [userRequests, setUserRequests] = useState<Record<string, number>>({});
  const [loadingStats, setLoadingStats] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Log the number of users received in props
    console.log(`UsersPanel received ${users?.length || 0} users`);
    
    if (users && users.length > 0) {
      fetchUserStats();
    }
  }, [users]);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        toast({
          title: 'Data diperbarui',
          description: 'Data pengguna telah diperbarui',
        });
      } catch (error) {
        console.error('Error refreshing data:', error);
        toast({
          title: 'Error',
          description: 'Gagal memperbarui data',
          variant: 'destructive'
        });
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const fetchUserStats = async () => {
    if (!users || users.length === 0) return;
    
    setLoadingStats(true);
    try {
      console.log("Fetching user stats for", users.length, "users");
      
      // Count complaints for each user - get all complaints with no filtering
      const { data: complaintsData, error: complaintsError } = await supabase
        .from('complaints')
        .select('user_id');
      
      if (complaintsError) {
        console.error("Error fetching complaints stats:", complaintsError);
      } else {
        console.log("Fetched complaints data:", complaintsData?.length || 0);
        
        // Count by user ID
        const complaints: Record<string, number> = {};
        users.forEach(user => {
          complaints[user.id] = 0; // Initialize with 0
        });
        
        complaintsData?.forEach((complaint: any) => {
          if (complaint.user_id) {
            complaints[complaint.user_id] = (complaints[complaint.user_id] || 0) + 1;
          }
        });
        
        setUserComplaints(complaints);
      }

      // Count service requests for each user - get all requests with no filtering
      const { data: requestsData, error: requestsError } = await supabase
        .from('service_requests')
        .select('user_id');

      if (requestsError) {
        console.error("Error fetching requests stats:", requestsError);
      } else {
        console.log("Fetched requests data:", requestsData?.length || 0);
        
        // Count by user ID
        const requests: Record<string, number> = {};
        users.forEach(user => {
          requests[user.id] = 0; // Initialize with 0
        });
        
        requestsData?.forEach((request: any) => {
          if (request.user_id) {
            requests[request.user_id] = (requests[request.user_id] || 0) + 1;
          }
        });
        
        setUserRequests(requests);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Safely handle the case where users might be undefined
  const displayUsers = users || [];
  
  console.log("UsersPanel rendering with:", displayUsers.length, "users");

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <UserIcon className="mr-2 h-5 w-5 text-purple-500" />
            {showAll ? "Semua Pengguna" : "Pengguna Terbaru"}
          </CardTitle>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading || isRefreshing ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead>Pengaduan</TableHead>
                <TableHead>Permohonan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada pengguna
                  </TableCell>
                </TableRow>
              ) : (
                displayUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      {loadingStats ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        userComplaints[user.id] || 0
                      )}
                    </TableCell>
                    <TableCell>
                      {loadingStats ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        userRequests[user.id] || 0
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

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
