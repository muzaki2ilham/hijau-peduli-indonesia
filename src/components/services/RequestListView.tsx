
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, FileText, ClipboardList } from "lucide-react";

interface RequestListViewProps {
  onServiceSelect: (service: string) => void;
}

const RequestListView = ({ onServiceSelect }: RequestListViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Permohonan Layanan</CardTitle>
        <CardDescription>
          Ajukan permohonan untuk layanan lingkungan seperti pengangkutan sampah khusus, peminjaman peralatan, atau edukasi lingkungan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Recycle className="h-5 w-5 text-green-600" /> Pengangkutan Sampah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Layanan pengangkutan sampah khusus untuk kegiatan berskala besar.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-green-600 hover:bg-green-50"
                onClick={() => onServiceSelect("Pengangkutan Sampah")}
              >
                Ajukan Permohonan
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" /> Edukasi Lingkungan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Permohonan untuk kegiatan sosialisasi dan edukasi lingkungan.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-green-600 hover:bg-green-50"
                onClick={() => onServiceSelect("Edukasi Lingkungan")}
              >
                Ajukan Permohonan
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-green-600" /> Rekomendasi Teknis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Permohonan rekomendasi teknis untuk izin lingkungan.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-green-600 hover:bg-green-50"
                onClick={() => onServiceSelect("Rekomendasi Teknis")}
              >
                Ajukan Permohonan
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Persyaratan Umum</h3>
          <ul className="space-y-1 text-sm list-disc list-inside text-gray-600">
            <li>Surat permohonan resmi dari institusi/organisasi/masyarakat.</li>
            <li>Dokumen identitas pemohon (KTP/SIM/Paspor).</li>
            <li>Rincian kegiatan atau layanan yang dimohonkan.</li>
            <li>Surat keterangan dari RT/RW setempat (untuk permohonan individu).</li>
            <li>Dokumen pendukung lainnya sesuai dengan jenis layanan.</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Catatan: Persyaratan spesifik untuk masing-masing layanan dapat berbeda. Silakan lihat detail pada halaman masing-masing layanan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestListView;
