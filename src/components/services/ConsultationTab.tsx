
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const ConsultationTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Konsultasi Lingkungan</CardTitle>
          <CardDescription>
            Konsultasikan masalah lingkungan dengan para ahli kami melalui berbagai saluran komunikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium">Hotline Lingkungan</h3>
                <p className="text-sm text-gray-600">Senin - Jumat, 08.00 - 16.00 WIB</p>
                <p className="text-green-600 font-medium">0800-1234-5678</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium">Email Konsultasi</h3>
                <p className="text-sm text-gray-600">Respon dalam 1-2 hari kerja</p>
                <p className="text-green-600 font-medium">konsultasi@dlh.go.id</p>
              </div>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">Jadwalkan Konsultasi Online</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Jadwal Konsultasi Tatap Muka</CardTitle>
          <CardDescription>
            Konsultasi langsung dengan ahli lingkungan di kantor Dinas Lingkungan Hidup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-green-800">Jam Layanan Konsultasi</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Senin - Kamis</span>
                  <span>09.00 - 15.00 WIB</span>
                </li>
                <li className="flex justify-between">
                  <span>Jumat</span>
                  <span>09.00 - 14.00 WIB</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu, Minggu & Libur Nasional</span>
                  <span>Tutup</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-green-800">Topik Konsultasi</h3>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Pengelolaan Sampah</li>
                <li>Izin Lingkungan</li>
                <li>Analisis Mengenai Dampak Lingkungan (AMDAL)</li>
                <li>Konservasi Air dan Energi</li>
                <li>Mitigasi Perubahan Iklim</li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full text-green-600 hover:bg-green-50">Lihat Detail Lokasi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationTab;
