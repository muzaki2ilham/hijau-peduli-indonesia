
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Complaint {
  id: string;
  name: string;
  complaint_type: string;
  status: string;
}

interface ComplaintsPanelProps {
  complaints: Complaint[];
  loading: boolean;
}

const ComplaintsPanel: React.FC<ComplaintsPanelProps> = ({ complaints, loading }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Pengaduan Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-4 text-gray-500">Memuat data...</p>
        ) : complaints.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow 
                  key={complaint.id}
                  className="cursor-pointer hover:bg-green-50"
                  onClick={() => navigate(`/admin/complaints/${complaint.id}`)}
                >
                  <TableCell>{complaint.name}</TableCell>
                  <TableCell>{complaint.complaint_type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {complaint.status === 'pending' ? 'Menunggu' :
                       complaint.status === 'in_progress' ? 'Diproses' :
                       complaint.status === 'resolved' ? 'Selesai' : complaint.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4 text-gray-500">Tidak ada pengaduan terbaru</p>
        )}
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/complaints')}
          >
            Lihat Semua
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintsPanel;
