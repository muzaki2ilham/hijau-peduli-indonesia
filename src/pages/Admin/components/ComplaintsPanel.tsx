
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Loader2, Eye, MessageSquare, Mail, MailOpen, CheckCircle } from "lucide-react";
import { Complaint, ComplaintResponse, useAdminDashboard } from '../hooks/useAdminDashboard';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

interface ComplaintsPanelProps {
  complaints: Complaint[];
  loading: boolean;
  showAll?: boolean;
  onRefresh?: () => void;
}

interface ResponseFormData {
  response: string;
  adminName: string;
}

const ComplaintsPanel: React.FC<ComplaintsPanelProps> = ({ complaints, loading, showAll = false, onRefresh }) => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [responding, setResponding] = useState(false);
  const [responses, setResponses] = useState<ComplaintResponse[]>([]);
  const { toast } = useToast();
  const { updateComplaintStatus, respondToComplaint, fetchComplaintResponses } = useAdminDashboard();
  
  const form = useForm<ResponseFormData>({
    defaultValues: {
      response: '',
      adminName: 'Admin'
    }
  });

  const handleViewComplaint = async (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setOpenDialog(true);
    
    // If status is 'pending', change to 'read'
    if (complaint.status === 'pending') {
      await handleUpdateStatus(complaint.id, 'read');
    }
    
    // Load any existing responses
    const complaintResponses = await handleFetchResponses(complaint.id);
    setResponses(complaintResponses);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setUpdateLoading(true);
    try {
      const success = await updateComplaintStatus(id, status);
      
      if (!success) throw new Error('Failed to update status');
      
      // Update the complaint in the list
      if (selectedComplaint?.id === id) {
        setSelectedComplaint({ ...selectedComplaint, status });
      }
      
      // Call refresh if provided
      if (onRefresh) {
        onRefresh();
      }
      
      toast({
        title: 'Status diperbarui',
        description: `Pengaduan telah diperbarui ke status: ${status}`,
      });
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

  const handleFetchResponses = async (complaintId: string): Promise<ComplaintResponse[]> => {
    try {
      // Call the edge function to get responses
      return await fetchComplaintResponses(complaintId);
    } catch (error: any) {
      toast({
        title: 'Error saat mengambil respons',
        description: error.message,
        variant: 'destructive',
      });
      return [];
    }
  };

  const handleSubmitResponse = async (formData: ResponseFormData) => {
    if (!selectedComplaint) return;
    
    setResponding(true);
    try {
      const success = await respondToComplaint(
        selectedComplaint.id, 
        formData.response,
        formData.adminName
      );
      
      if (!success) throw new Error('Failed to send response');
      
      // Fetch updated responses
      const updatedResponses = await handleFetchResponses(selectedComplaint.id);
      setResponses(updatedResponses);
      
      // Update complaint status
      if (selectedComplaint) {
        setSelectedComplaint({ ...selectedComplaint, status: 'responded' });
      }
      
      // Clear form
      form.reset();
      
      // Call refresh if provided
      if (onRefresh) {
        onRefresh();
      }
      
      toast({
        title: 'Balasan terkirim',
        description: 'Balasan pengaduan telah berhasil dikirim.',
      });
    } catch (error: any) {
      toast({
        title: 'Error saat mengirim balasan',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setResponding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Mail className="h-4 w-4" />;
      case 'read':
        return <MailOpen className="h-4 w-4" />;
      case 'responded':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
          {showAll ? "Semua Pengaduan" : "Pengaduan Terbaru"}
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
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Belum ada pengaduan
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.name}</TableCell>
                    <TableCell>{complaint.complaint_type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        complaint.status === "pending" ? "outline" :
                        complaint.status === "read" ? "secondary" :
                        complaint.status === "responded" ? "default" : "destructive"
                      } className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)} {complaint.status}
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

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
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
                      selectedComplaint.status === "read" ? "secondary" :
                      selectedComplaint.status === "responded" ? "default" : "destructive"
                    }>
                      {selectedComplaint.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p>{selectedComplaint.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tanggal:</p>
                    <p>{new Date(selectedComplaint.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Deskripsi:</p>
                  <div className="text-sm mt-1 p-3 bg-gray-50 rounded-md border">
                    {selectedComplaint.description}
                  </div>
                </div>
                
                {/* Responses Section */}
                {responses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Balasan:</p>
                    <div className="space-y-2 mt-1">
                      {responses.map((response, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm">{response.response_text}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-medium">{response.admin_name}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(response.created_at).toLocaleDateString('id-ID')}, 
                              {new Date(response.created_at).toLocaleTimeString('id-ID')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Response Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmitResponse)} className="space-y-3">
                    <FormField
                      control={form.control}
                      name="response"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Balasan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis balasan anda di sini..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="adminName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Admin</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama admin"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-2">
                      <div className="space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedComplaint.id, 'pending')}
                          disabled={selectedComplaint.status === 'pending' || updateLoading || responding}
                        >
                          <Mail className="mr-1 h-4 w-4" /> Pending
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedComplaint.id, 'read')}
                          disabled={selectedComplaint.status === 'read' || updateLoading || responding}
                        >
                          <MailOpen className="mr-1 h-4 w-4" /> Dibaca
                        </Button>
                      </div>
                      
                      <div className="space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpenDialog(false)}
                        >
                          Tutup
                        </Button>
                        
                        <Button
                          type="submit"
                          disabled={responding}
                        >
                          {responding ? (
                            <>
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                              Mengirim...
                            </>
                          ) : (
                            <>Kirim Balasan</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ComplaintsPanel;
