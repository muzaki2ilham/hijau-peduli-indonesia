
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Loader2, CheckCircle } from "lucide-react";
import { ServiceRequest } from '../../hooks/types';

interface RequestDetailDialogProps {
  selectedRequest: ServiceRequest | null;
  open: boolean;
  onClose: () => void;
  updateRequestStatus: (id: string, status: string) => Promise<void>;
  updateLoading: boolean;
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

const RequestDetailDialog: React.FC<RequestDetailDialogProps> = ({
  selectedRequest,
  open,
  onClose,
  updateRequestStatus,
  updateLoading
}) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Detail Permohonan</DialogTitle>
        </DialogHeader>
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
              onClick={onClose}
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailDialog;
