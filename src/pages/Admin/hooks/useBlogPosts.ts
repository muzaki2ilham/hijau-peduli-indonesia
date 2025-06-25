
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  published: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogPost])
        .select();

      if (error) throw error;
      if (data) {
        setBlogPosts(prev => [data[0], ...prev]);
      }
      return true;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return false;
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        setBlogPosts(prev => prev.map(post => post.id === id ? data[0] : post));
      }
      return true;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return false;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    // Mock implementation - you can implement actual file upload later
    console.log('Image upload not implemented yet');
    return null;
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    uploadImage
  };
};
