import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInformation = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Informasi Kontak Dinas Lingkungan Hidup Kota Tegal</CardTitle>
        <CardDescription>
          Berikut adalah berbagai cara untuk menghubungi kami.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Alamat</h3>
            <p className="text-gray-600">Jl. Nila No.11, Tegalsari, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52111</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Telepon</h3>
            <p className="text-gray-600">(021) 1234-5678</p>
            <p className="text-gray-600">0800-1234-5678 (Hotline)</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-600">info@dlh.go.id</p>
            <p className="text-gray-600">pengaduan@dlh.go.id (Pengaduan)</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Jam Operasional</h3>
            <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
            <p className="text-gray-600">Sabtu, Minggu & Hari Libur: Tutup</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
