import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Pencil, Trash2, Image, Video } from "lucide-react";
import { useGalleryItems, GalleryItem } from '../hooks/useGalleryItems';

const GalleryManagement: React.FC = () => {
  const { galleryItems, loading, fetchGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem, uploadImage } = useGalleryItems();
  const [openDialog, setOpenDialog] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'photo' as 'photo' | 'video',
    category: '',
    url: '',
    thumbnail_url: '',
    date: '',
    duration: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleTabChange = (tab: 'photo' | 'video') => {
    setActiveTab(tab);
    setFormData({
      ...formData,
      type: tab,
      duration: tab === 'video' ? formData.duration : ''
    });
  };

  const handleOpenCreate = (type: 'photo' | 'video' = 'photo') => {
    setFormMode('create');
    setActiveTab(type);
    setFormData({
      title: '',
      description: '',
      type: type,
      category: '',
      url: '',
      thumbnail_url: '',
      date: new Date().toISOString().substring(0, 10),
      duration: ''
    });
    setImageFile(null);
    setThumbnailFile(null);
    setSelectedItem(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setFormMode('edit');
    setActiveTab(item.type);
    setFormData({
      title: item.title,
      description: item.description || '',
      type: item.type,
      category: item.category,
      url: item.url,
      thumbnail_url: item.thumbnail_url || '',
      date: item.date || '',
      duration: item.duration || ''
    });
    setSelectedItem(item);
    setImageFile(null);
    setThumbnailFile(null);
    setOpenDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      let imageUrl = formData.url;
      let thumbnailUrl = formData.thumbnail_url;
      
      if (formData.type === 'photo' && imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      if (formData.type === 'video' && thumbnailFile) {
        const uploadedUrl = await uploadImage(thumbnailFile);
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl;
        }
      }
      
      const itemData = {
        ...formData,
        url: imageUrl,
        thumbnail_url: thumbnailUrl || null
      };
      
      if (formMode === 'create') {
        await createGalleryItem(itemData);
      } else if (formMode === 'edit' && selectedItem) {
        await updateGalleryItem(selectedItem.id, itemData);
      }
      
      fetchGalleryItems();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      await deleteGalleryItem(id);
      fetchGalleryItems();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const photoItems = galleryItems.filter(item => item.type === 'photo');
  const videoItems = galleryItems.filter(item => item.type === 'video');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Manajemen Galeri</CardTitle>
        <div className="flex gap-2">
          <Button onClick={() => handleOpenCreate('photo')} className="flex items-center gap-1">
            <Image className="h-4 w-4" /> Tambah Foto
          </Button>
          <Button onClick={() => handleOpenCreate('video')} className="flex items-center gap-1">
            <Video className="h-4 w-4" /> Tambah Video
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="photo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Image className="h-4 w-4" /> Foto
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photo">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {photoItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Belum ada foto yang ditambahkan
                      </TableCell>
                    </TableRow>
                  ) : (
                    photoItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.date || '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
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
          </TabsContent>
          
          <TabsContent value="video">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videoItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Belum ada video yang ditambahkan
                      </TableCell>
                    </TableRow>
                  ) : (
                    videoItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.duration || '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
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
          </TabsContent>
        </Tabs>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {formMode === 'create' ? `Tambah ${activeTab === 'photo' ? 'Foto' : 'Video'} Baru` : `Edit ${activeTab === 'photo' ? 'Foto' : 'Video'}`}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as 'photo' | 'video')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="photo" className="flex items-center gap-2">
                    <Image className="h-4 w-4" /> Foto
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" /> Video
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-4">
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
                      <Label htmlFor="category">Kategori</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kegiatan">Kegiatan</SelectItem>
                          <SelectItem value="edukasi">Edukasi</SelectItem>
                          <SelectItem value="konservasi">Konservasi</SelectItem>
                          <SelectItem value="kampanye">Kampanye</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {activeTab === 'photo' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="image">Foto</Label>
                        {formMode === 'create' ? (
                          <Input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                          />
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Input
                              id="image"
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                              className="flex-1"
                            />
                            {formData.url && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(formData.url, '_blank')}
                              >
                                <Image className="h-4 w-4 mr-1" /> Lihat
                              </Button>
                            )}
                          </div>
                        )}
                        {imageFile && (
                          <p className="text-sm text-gray-500">
                            File baru dipilih: {imageFile.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Tanggal</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="videoUrl">URL Video</Label>
                        <Input
                          id="videoUrl"
                          type="url"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Masukkan URL embed video (YouTube, Vimeo, dll)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thumbnail">Gambar Thumbnail</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="thumbnail"
                            type="file"
                            onChange={handleThumbnailChange}
                            accept="image/*"
                            className="flex-1"
                          />
                          {formData.thumbnail_url && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(formData.thumbnail_url, '_blank')}
                            >
                              <Image className="h-4 w-4 mr-1" /> Lihat
                            </Button>
                          )}
                        </div>
                        {thumbnailFile && (
                          <p className="text-sm text-gray-500">
                            File baru dipilih: {thumbnailFile.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Durasi</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="3:45"
                        />
                      </div>
                    </>
                  )}
                </div>
              </Tabs>

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

export default GalleryManagement;
