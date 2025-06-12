
import { useState, useEffect } from "react";
import { dummyBlogPosts } from "@/data/dummyBlogPosts";

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
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setTimeout(() => {
      setBlogPosts(dummyBlogPosts);
      setLoading(false);
    }, 500);
  };

  const createBlogPost = async (data: Omit<BlogPost, 'id' | 'created_at'>) => {
    const newPost: BlogPost = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setBlogPosts(prev => [newPost, ...prev]);
    return true;
  };

  const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...data } : post
    ));
    return true;
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    return true;
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
    deleteBlogPost
  };
};
