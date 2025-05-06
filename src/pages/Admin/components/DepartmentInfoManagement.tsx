
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, Image, FileText } from "lucide-react";
import { useDepartmentInfo, DepartmentInfo } from '../hooks/useDepartmentInfo';

const DepartmentInfoManagement: React.FC = () => {
  const { departmentInfo, loading, fetchDepartmentInfo, createDepartmentInfo, updateDepartmentInfo, deleteDepartmentInfo, uploadImage } = useDepartmentInfo();
  const [openDialog, setOpenDialog] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedInfo, setSelectedInfo] = useState<DepartmentInfo | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenCreate = () => {
    setFormMode('create');
    setFormData({
      title: '',
      content: '',
      type: '',
      image_url: ''
    });
    setImageFile(null);
    setSelectedInfo(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (info: DepartmentInfo) => {
    setFormMode('edit');
    setFormData({
      title: info.title,
      content: info.content,
      type: info.type,
      image_url: info.image_url || ''
    });
    setSelectedInfo(info);
    setImageFile(null);
    setOpenDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const infoData = {
        ...formData,
        image_url: imageUrl || null
      };
      
      if (formMode === 'create') {
        await createDepartmentInfo(infoData);
      } else if (formMode === 'edit' && selectedInfo) {
        await updateDepartmentInfo(selectedInfo.id, infoData);
      }
      
      fetchDepartmentInfo();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus informasi ini?')) {
      await deleteDepartmentInfo(id);
      fetchDepartmentInfo();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'profile': 'Profil',
      'vision': 'Visi',
      'mission': 'Misi',
      'structure': 'Struktur Organisasi',
      'history': 'Sejarah',
      'achievement': 'Prestasi',
      'service': 'Layanan',
      'contact': 'Kontak'
    };
    
    return typeLabels[type] || type;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Manajemen Informasi Dinas</CardTitle>
        <Button onClick={handleOpenCreate} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Tambah Informasi
        </Button>
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
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tanggal Update</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentInfo.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Belum ada informasi yang ditambahkan
                  </TableCell>
                </TableRow>
              ) : (
                departmentInfo.map((info) => (
                  <TableRow key={info.id}>
                    <TableCell className="font-medium">{info.title}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {getTypeLabel(info.type)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(info.updated_at).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(info)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(info.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {formMode === 'create' ? 'Tambah Informasi Baru' : 'Edit Informasi'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Informasi</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profile">Profil</SelectItem>
                      <SelectItem value="vision">Visi</SelectItem>
                      <SelectItem value="mission">Misi</SelectItem>
                      <SelectItem value="structure">Struktur Organisasi</SelectItem>
                      <SelectItem value="history">Sejarah</SelectItem>
                      <SelectItem value="achievement">Prestasi</SelectItem>
                      <SelectItem value="service">Layanan</SelectItem>
                      <SelectItem value="contact">Kontak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Konten</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Gambar</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="flex-1"
                  />
                  {formData.image_url && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(formData.image_url, '_blank')}
                    >
                      <Image className="h-4 w-4 mr-1" /> Lihat
                    </Button>
                  )}
                </div>
                {imageFile && (
                  <p className="text-sm text-gray-500">
                    File baru dipilih: {imageFile.name}
                  </p>
                )}
                {!imageFile && formData.image_url && (
                  <p className="text-sm text-gray-500">
                    Gambar saat ini akan digunakan
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  disabled={formLoading}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {formMode === 'create' ? 'Simpan' : 'Perbarui'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DepartmentInfoManagement;
