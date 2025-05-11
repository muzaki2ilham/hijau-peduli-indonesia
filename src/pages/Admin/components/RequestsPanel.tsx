
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardList, RefreshCw } from "lucide-react";
import { ServiceRequest } from '../hooks/types';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import RequestsTable from './requests/RequestsTable';
import RequestDetailDialog from './requests/RequestDetailDialog';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

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
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-blue-500" />
            {showAll ? "Data Permohonan" : "Permohonan Layanan Terbaru"}
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
          <div>
            <RequestsTable 
              requests={currentRequests} 
              onViewRequest={handleViewRequest} 
              loading={loading}
              showId={true}
            />

            {requests.length > 0 && totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage - 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(pageNum => 
                      pageNum <= 2 || 
                      pageNum > totalPages - 2 || 
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    )
                    .map((pageNum, i, arr) => {
                      // Add ellipsis
                      if (i > 0 && arr[i - 1] !== pageNum - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${pageNum}`}>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink 
                                href="#" 
                                isActive={currentPage === pageNum}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNum);
                                }}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          </React.Fragment>
                        );
                      }
                      return (
                        <PaginationItem key={`page-${pageNum}`}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === pageNum}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })
                  }
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage + 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}

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
