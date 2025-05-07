
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, ClipboardList, CheckCircle, Clock, Eye, RefreshCw } from "lucide-react";
import { ServiceRequest } from '../hooks/useAdminDashboard';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RequestsPanelProps {
  requests: ServiceRequest[];
  loading: boolean;
  showAll?: boolean;
  onRefresh?: () => void;
}

const RequestsPanel: React.FC<RequestsPanelProps> = ({ 
  requests, 
  loading,
  showAll = false,
  onRefresh
}) => {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        toast({
          title: 'Data diperbarui',
          description: 'Data permohonan telah diperbarui',
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

  useEffect(() => {
    // Log the number of requests received in props
    console.log(`RequestsPanel received ${requests.length} requests`);
  }, [requests]);

  const handleViewRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const updateRequestStatus = async (id: string, status: string) => {
    setUpdateLoading(true);
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Status diperbarui',
        description: `Permohonan telah diperbarui ke status: ${status}`,
      });

      // Refresh the data after update
      if (onRefresh) {
        await onRefresh();
      }
      
      setOpenDialog(false);
    } catch (error: any) {
      toast({
        title: 'Error saat memperbarui status',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'processing':
        return 'secondary';
      case 'completed':
        return 'default';
      default:
        return 'destructive';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-blue-500" />
            {showAll ? "Semua Permohonan" : "Permohonan Layanan Terbaru"}
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
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Belum ada permohonan layanan
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Detail Permohonan</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nama:</p>
                    <p>{selectedRequest.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jenis Layanan:</p>
                    <p>{selectedRequest.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tanggal Permohonan:</p>
                    <p>{new Date(selectedRequest.request_date).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <Badge variant={getStatusBadgeVariant(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telepon:</p>
                    <p>{selectedRequest.phone}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Alamat:</p>
                  <p className="text-sm mt-1">{selectedRequest.address}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Deskripsi:</p>
                  <p className="text-sm mt-1">{selectedRequest.description}</p>
                </div>

                <div className="flex justify-between pt-4">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateRequestStatus(selectedRequest.id, 'pending')}
                      disabled={selectedRequest.status === 'pending' || updateLoading}
                    >
                      <Clock className="mr-1 h-4 w-4" /> Pending
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateRequestStatus(selectedRequest.id, 'processing')}
                      disabled={selectedRequest.status === 'processing' || updateLoading}
                    >
                      <Loader2 className="mr-1 h-4 w-4" /> Proses
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateRequestStatus(selectedRequest.id, 'completed')}
                      disabled={selectedRequest.status === 'completed' || updateLoading}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" /> Selesai
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RequestsPanel;
