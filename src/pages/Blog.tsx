
import React from "react";
import { Loader2 } from "lucide-react";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useBlogPosts } from "@/pages/Admin/hooks/useBlogPosts";

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
  
  // Get featured post (most recent published post)
  const featuredPost = publishedPosts.length > 0 ? publishedPosts[0] : null;
  
  // Get other posts (excluding featured)
  const otherPosts = publishedPosts.slice(1);

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
            <BlogSidebar posts={publishedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
