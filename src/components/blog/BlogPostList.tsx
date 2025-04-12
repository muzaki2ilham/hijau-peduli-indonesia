
import React from "react";
import { Button } from "@/components/ui/button";
import BlogPostCard from "./BlogPostCard";
import { BlogPost } from "./FeaturedPost";

interface BlogPostListProps {
  posts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Artikel Terbaru</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" className="text-green-600 hover:bg-green-50">
          Lihat Lebih Banyak Artikel
        </Button>
      </div>
    </div>
  );
};

export default BlogPostList;
