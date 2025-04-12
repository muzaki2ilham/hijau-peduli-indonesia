
import React from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogPostList from "@/components/blog/BlogPostList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { featuredPost, blogPosts, categories, archives } from "@/components/blog/blogData";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <BlogHeader />
        
        <FeaturedPost post={featuredPost} />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2">
            <BlogPostList posts={blogPosts} />
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
