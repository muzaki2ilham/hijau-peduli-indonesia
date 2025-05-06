
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBlogPosts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error saat memuat blog',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Blog berhasil dibuat',
        description: 'Artikel blog baru telah berhasil ditambahkan',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat membuat blog',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Blog berhasil diperbarui',
        description: 'Artikel blog telah berhasil diperbarui',
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Error saat memperbarui blog',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Blog berhasil dihapus',
        description: 'Artikel blog telah dihapus dari sistem',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error saat menghapus blog',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    selectedPost,
    setSelectedPost,
    fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
  };
};
