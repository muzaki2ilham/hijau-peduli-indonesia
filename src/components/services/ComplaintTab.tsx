
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Mail, MapPin } from "lucide-react";

const ComplaintTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Formulir Pengaduan Lingkungan</CardTitle>
        <CardDescription>
          Laporkan masalah lingkungan di sekitar Anda seperti pembuangan sampah ilegal, pencemaran air, atau polusi udara.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <User className="h-4 w-4" />
                </span>
                <Input id="name" placeholder="Masukkan nama lengkap Anda" className="rounded-l-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <Input id="email" type="email" placeholder="contoh@email.com" className="rounded-l-none" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Lokasi Kejadian</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <MapPin className="h-4 w-4" />
              </span>
              <Input id="location" placeholder="Alamat lengkap lokasi kejadian" className="rounded-l-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="complaint-type" className="text-sm font-medium">Jenis Pengaduan</label>
            <select id="complaint-type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="" disabled selected>Pilih jenis pengaduan</option>
              <option value="trash">Pembuangan Sampah Ilegal</option>
              <option value="water">Pencemaran Air</option>
              <option value="air">Polusi Udara</option>
              <option value="noise">Polusi Suara</option>
              <option value="forest">Kerusakan Hutan/Taman</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Deskripsi Pengaduan</label>
            <Textarea id="description" placeholder="Jelaskan secara detail masalah lingkungan yang Anda temui..." rows={5} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Lampiran Foto/Dokumen (opsional)</label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Klik atau seret file ke area ini untuk mengunggah</p>
                <p className="text-xs text-gray-400">JPG, PNG, atau PDF (maks. 5MB)</p>
                <input type="file" className="hidden" />
                <Button variant="outline" size="sm" className="mt-2">Pilih File</Button>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-green-600 hover:bg-green-700">Kirim Pengaduan</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintTab;
