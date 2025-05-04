
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceRequest {
  id: string;
  name: string;
  service_type: string;
  status: string;
}

interface RequestsPanelProps {
  requests: ServiceRequest[];
  loading: boolean;
}

const RequestsPanel: React.FC<RequestsPanelProps> = ({ requests, loading }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
          <ClipboardList className="h-5 w-5" /> Permohonan Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-4 text-gray-500">Memuat data...</p>
        ) : requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow 
                  key={request.id}
                  className="cursor-pointer hover:bg-green-50"
                  onClick={() => navigate(`/admin/requests/${request.id}`)}
                >
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.service_type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status === 'pending' ? 'Menunggu' :
                       request.status === 'in_progress' ? 'Diproses' :
                       request.status === 'completed' ? 'Selesai' : request.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4 text-gray-500">Tidak ada permohonan terbaru</p>
        )}
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/requests')}
          >
            Lihat Semua
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsPanel;
