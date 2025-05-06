
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, UserIcon } from "lucide-react";
import { UserProfile } from '../hooks/useAdminDashboard';
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

  useEffect(() => {
    if (users.length > 0) {
      fetchUserStats();
    }
  }, [users]);

  const fetchUserStats = async () => {
    setLoadingStats(true);
    try {
      // Fetch complaints count for each user
      const { data: complaintsData, error: complaintsError } = await supabase
        .from('complaints')
        .select('user_id, count')
        .eq('user_id', 'is.not.null')
        .group('user_id');

      if (complaintsError) throw complaintsError;

      const complaints: Record<string, number> = {};
      complaintsData?.forEach((item: any) => {
        if (item.user_id) {
          complaints[item.user_id] = parseInt(item.count);
        }
      });

      // Fetch service requests count for each user
      const { data: requestsData, error: requestsError } = await supabase
        .from('service_requests')
        .select('user_id, count')
        .eq('user_id', 'is.not.null')
        .group('user_id');

      if (requestsError) throw requestsError;

      const requests: Record<string, number> = {};
      requestsData?.forEach((item: any) => {
        if (item.user_id) {
          requests[item.user_id] = parseInt(item.count);
        }
      });

      setUserComplaints(complaints);
      setUserRequests(requests);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat statistik pengguna',
        variant: 'destructive'
      });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <UserIcon className="mr-2 h-5 w-5 text-purple-500" />
          {showAll ? "Semua Pengguna" : "Pengguna Terbaru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada pengguna
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>{loadingStats ? 
                      <Loader2 className="h-4 w-4 animate-spin" /> : 
                      userComplaints[user.id] || 0}
                    </TableCell>
                    <TableCell>{loadingStats ? 
                      <Loader2 className="h-4 w-4 animate-spin" /> : 
                      userRequests[user.id] || 0}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {(!showAll && users.length > 0) && (
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
