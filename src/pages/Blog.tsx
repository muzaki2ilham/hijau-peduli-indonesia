
import React from "react";
import { Loader2 } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useBlogPosts } from "@/pages/Admin/hooks/useBlogPosts";
import { BlogPost as ComponentBlogPost } from "@/components/blog/FeaturedPost";

const Blog = () => {
  const { blogPosts, loading } = useBlogPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  // Filter published posts only
  const publishedPosts = blogPosts.filter(post => post.published);
  
  // Transform database posts to component format
  const transformedPosts: ComponentBlogPost[] = publishedPosts.map(post => ({
    id: parseInt(post.id.slice(-8), 16), // Convert UUID to number for component
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: new Date(post.created_at).toLocaleDateString('id-ID'),
    readTime: `${Math.ceil(post.content.length / 200)} min baca`,
    imageUrl: post.image_url || '/placeholder.svg'
  }));
  
  // Get featured post (most recent published post)
  const featuredPost = transformedPosts.length > 0 ? transformedPosts[0] : null;
  
  // Get other posts (excluding featured)
  const otherPosts = transformedPosts.slice(1);

  // Generate categories data for sidebar
  const categories = publishedPosts.reduce((acc: any[], post) => {
    const existing = acc.find(cat => cat.name === post.category);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ name: post.category, count: 1 });
    }
    return acc;
  }, []);

  // Generate archives data for sidebar
  const archives = publishedPosts.reduce((acc: any[], post) => {
    const date = new Date(post.created_at);
    const monthYear = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
    const existing = acc.find(arch => arch.month === monthYear);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ month: monthYear, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <BlogHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {featuredPost && <FeaturedPost post={featuredPost} />}
            <BlogPostList posts={otherPosts} />
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar categories={categories} archives={archives} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
