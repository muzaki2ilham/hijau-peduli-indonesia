
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react";
import { Complaint } from '../hooks/useAdminDashboard';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ComplaintsPanelProps {
  complaints: Complaint[];
  loading: boolean;
  showAll?: boolean;
}

const ComplaintsPanel: React.FC<ComplaintsPanelProps> = ({ 
  complaints, 
  loading,
  showAll = false
}) => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const { toast } = useToast();

  const fetchAllComplaints = async () => {
    if (showAll && allComplaints.length === 0) {
      setLoadingAll(true);
      try {
        const { data, error } = await supabase
          .from('complaints')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAllComplaints(data || []);
      } catch (error: any) {
        toast({
          title: 'Error saat memuat pengaduan',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoadingAll(false);
      }
    }
  };

  React.useEffect(() => {
    if (showAll) {
      fetchAllComplaints();
    }
  }, [showAll]);

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setOpenDialog(true);
  };

  const updateComplaintStatus = async (id: string, status: string) => {
    setUpdateLoading(true);
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update in memory
      if (showAll) {
        setAllComplaints(allComplaints.map(c => 
          c.id === id ? { ...c, status } : c
        ));
      }

      toast({
        title: 'Status diperbarui',
        description: `Pengaduan telah diperbarui ke status: ${status}`,
      });

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

  const displayedComplaints = showAll ? allComplaints : complaints;
  const isLoading = showAll ? loadingAll : loading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
          {showAll ? "Semua Pengaduan" : "Pengaduan Terbaru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
              {displayedComplaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Belum ada pengaduan
                  </TableCell>
                </TableRow>
              ) : (
                displayedComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.name}</TableCell>
                    <TableCell>{complaint.complaint_type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        complaint.status === "pending" ? "outline" :
                        complaint.status === "processing" ? "secondary" :
                        complaint.status === "resolved" ? "default" : "destructive"
                      }>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewComplaint(complaint)}
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

        {!showAll && displayedComplaints.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={() => fetchAllComplaints()}>
              Lihat Semua Pengaduan
            </Button>
          </div>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Detail Pengaduan</DialogTitle>
            </DialogHeader>
            {selectedComplaint && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nama:</p>
                    <p>{selectedComplaint.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jenis Pengaduan:</p>
                    <p>{selectedComplaint.complaint_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lokasi:</p>
                    <p>{selectedComplaint.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <Badge variant={
                      selectedComplaint.status === "pending" ? "outline" :
                      selectedComplaint.status === "processing" ? "secondary" :
                      selectedComplaint.status === "resolved" ? "default" : "destructive"
                    }>
                      {selectedComplaint.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Deskripsi:</p>
                  <p className="text-sm mt-1">{selectedComplaint.description}</p>
                </div>

                <div className="flex justify-between pt-4">
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'pending')}
                      disabled={selectedComplaint.status === 'pending' || updateLoading}
                    >
                      <Clock className="mr-1 h-4 w-4" /> Pending
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'processing')}
                      disabled={selectedComplaint.status === 'processing' || updateLoading}
                    >
                      <Loader2 className="mr-1 h-4 w-4" /> Proses
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'resolved')}
                      disabled={selectedComplaint.status === 'resolved' || updateLoading}
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

export default ComplaintsPanel;
