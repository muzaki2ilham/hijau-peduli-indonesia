
import React, { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  created_at: string;
  image_url: string | null;
  published: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [archives, setArchives] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      if (data && data.length > 0) {
        // Set the first post as featured
        setFeaturedPost(data[0]);
        // Set the rest as regular posts
        setPosts(data.slice(1));
        
        // Generate categories from posts
        const categoryMap = new Map();
        data.forEach(post => {
          const count = categoryMap.get(post.category) || 0;
          categoryMap.set(post.category, count + 1);
        });
        
        const categoryList = Array.from(categoryMap.entries()).map(([name, count]) => ({
          name,
          count
        }));
        setCategories(categoryList);

        // Generate archives from posts
        const archiveMap = new Map();
        data.forEach(post => {
          const date = new Date(post.created_at);
          const monthYear = date.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long' 
          });
          const count = archiveMap.get(monthYear) || 0;
          archiveMap.set(monthYear, count + 1);
        });
        
        const archiveList = Array.from(archiveMap.entries()).map(([month, count]) => ({
          month,
          count
        }));
        setArchives(archiveList);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <BlogHeader />
        
        {featuredPost && (
          <FeaturedPost post={{
            id: parseInt(featuredPost.id),
            title: featuredPost.title,
            excerpt: featuredPost.excerpt,
            category: featuredPost.category,
            author: featuredPost.author,
            date: new Date(featuredPost.created_at).toLocaleDateString('id-ID'),
            readTime: "5 menit",
            imageUrl: featuredPost.image_url || "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&auto=format"
          }} />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2">
            <BlogPostList posts={posts.map(post => ({
              id: parseInt(post.id),
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
              author: post.author,
              date: new Date(post.created_at).toLocaleDateString('id-ID'),
              readTime: "5 menit",
              imageUrl: post.image_url || "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&auto=format"
            }))} />
          </div>

          {/* Sidebar */}
          <div>
            <BlogSidebar categories={categories} archives={archives} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
