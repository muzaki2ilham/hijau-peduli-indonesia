
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ServiceRequest } from '../../hooks/types';

interface RequestsTableProps {
  requests: ServiceRequest[];
  onViewRequest: (request: ServiceRequest) => void;
  loading: boolean;
}

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

const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onViewRequest, loading }) => {
  return (
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
                  onClick={() => onViewRequest(request)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default RequestsTable;
