
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "./FeaturedPost";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="md:flex">
        <div className="md:w-1/3">
          <AspectRatio ratio={4/3} className="h-full">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <div className="p-4 md:w-2/3">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center mb-1">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-xs ml-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {post.readTime}
              </span>
            </div>
            <CardTitle className="text-lg text-green-800">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription className="text-sm mb-2">
              {post.excerpt}
            </CardDescription>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <User className="h-3 w-3 mr-1" />
              <span className="mr-2">{post.author}</span>
              <Calendar className="h-3 w-3 mr-1" />
              <span>{post.date}</span>
            </div>
            <Button variant="link" className="text-green-600 p-0 h-auto" asChild>
              <Link to={`/blog/${post.id}`} className="flex items-center">
                Baca Selengkapnya <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default BlogPostCard;
