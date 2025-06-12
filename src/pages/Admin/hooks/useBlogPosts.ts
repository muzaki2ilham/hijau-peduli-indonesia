
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

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setBlogPosts(dummyBlogPosts);
      setLoading(false);
    }, 500);
  }, []);

  return {
    blogPosts,
    loading
  };
};
