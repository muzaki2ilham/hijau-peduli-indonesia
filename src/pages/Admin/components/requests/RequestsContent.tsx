
import React from 'react';
import { Loader2 } from "lucide-react";
import { ServiceRequest } from '../../hooks/types';
import RequestsTable from './RequestsTable';
import RequestsPagination from './RequestsPagination';

interface RequestsContentProps {
  requests: ServiceRequest[];
  currentRequests: ServiceRequest[];
  loading: boolean;
  isRefreshing: boolean;
  currentPage: number;
  totalPages: number;
  onViewRequest: (request: ServiceRequest) => void;
  onPageChange: (page: number) => void;
}

const RequestsContent: React.FC<RequestsContentProps> = ({
  requests,
  currentRequests,
  loading,
  isRefreshing,
  currentPage,
  totalPages,
  onViewRequest,
  onPageChange
}) => {
  if (loading || isRefreshing) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div>
      <RequestsTable 
        requests={currentRequests} 
        onViewRequest={onViewRequest} 
        loading={loading}
        showId={true}
      />

      {requests.length > 0 && (
        <RequestsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default RequestsContent;
