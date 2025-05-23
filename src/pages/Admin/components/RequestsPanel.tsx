
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ServiceRequest } from '../hooks/types';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import RequestDetailDialog from './requests/RequestDetailDialog';
import RequestsPanelHeader from './requests/RequestsPanelHeader';
import RequestsContent from './requests/RequestsContent';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <Card>
      <RequestsPanelHeader
        showAll={showAll}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      <CardContent>
        <RequestsContent
          requests={requests}
          currentRequests={currentRequests}
          loading={loading}
          isRefreshing={isRefreshing}
          currentPage={currentPage}
          totalPages={totalPages}
          onViewRequest={handleViewRequest}
          onPageChange={setCurrentPage}
        />

        <RequestDetailDialog 
          selectedRequest={selectedRequest}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          updateRequestStatus={updateRequestStatus}
          updateLoading={updateLoading}
        />
      </CardContent>
    </Card>
  );
};

export default RequestsPanel;
