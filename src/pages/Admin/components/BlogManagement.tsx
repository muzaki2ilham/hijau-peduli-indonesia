
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, Image } from "lucide-react";
import { useBlogPosts, BlogPost } from '../hooks/useBlogPosts';
import { useGalleryItems } from '../hooks/useGalleryItems';

const BlogManagement: React.FC = () => {
  const { blogPosts, loading, fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  const { uploadImage } = useGalleryItems();
  const [openDialog, setOpenDialog] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: '',
    published: false,
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenCreate = () => {
    setFormMode('create');
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: '',
      published: false,
      image_url: ''
    });
    setImageFile(null);
    setSelectedPost(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setFormMode('edit');
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      published: post.published,
      image_url: post.image_url || ''
    });
    setSelectedPost(post);
    setImageFile(null);
    setOpenDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, 'blog');
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const postData = {
        ...formData,
        image_url: imageUrl || null
      };
      
      if (formMode === 'create') {
        await createBlogPost(postData);
      } else if (formMode === 'edit' && selectedPost) {
        await updateBlogPost(selectedPost.id, postData);
      }
      
      fetchBlogPosts();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel blog ini?')) {
      await deleteBlogPost(id);
      fetchBlogPosts();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Manajemen Blog</CardTitle>
        <Button onClick={handleOpenCreate} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Tambah Artikel
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
                <TableHead>Kategori</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Belum ada artikel blog yang ditambahkan
                  </TableCell>
                </TableRow>
              ) : (
                blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {post.published ? 'Dipublikasi' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(post)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
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
                {formMode === 'create' ? 'Tambah Artikel Baru' : 'Edit Artikel'}
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
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  required
                />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="published" 
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">
                      {formData.published ? 'Dipublikasi' : 'Draft'}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Gambar Sampul</Label>
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

export default BlogManagement;
