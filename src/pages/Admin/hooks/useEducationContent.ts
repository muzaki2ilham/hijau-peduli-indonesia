
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface EducationContent {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'ebook' | 'infographic' | 'module';
  category: string;
  content?: string;
  url?: string;
  file_size?: string;
  duration?: string;
  image_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export const useEducationContent = () => {
  const [educationContent, setEducationContent] = useState<EducationContent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEducationContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform blog posts to education content format
      const transformedData: EducationContent[] = data?.map(post => ({
        id: post.id,
        title: post.title,
        description: post.excerpt,
        type: 'article' as const,
        category: post.category,
        content: post.content,
        image_url: post.image_url,
        created_at: post.created_at,
        updated_at: post.updated_at
      })) || [];
      
      setEducationContent(transformedData);
    } catch (error) {
      console.error('Error fetching education content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationContent();
  }, []);

  return {
    educationContent,
    loading,
    fetchEducationContent
  };
};
