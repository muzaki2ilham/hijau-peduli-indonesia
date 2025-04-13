
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, Calendar } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <BookOpen className="mr-2 h-5 w-5" /> Artikel Unggulan
      </h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="md:flex">
          <div className="md:w-1/2">
            <AspectRatio ratio={16/9} className="h-full">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex items-center mb-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-xs ml-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {post.readTime}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-3">{post.author}</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link to={`/blog/${post.id}`}>Baca Selengkapnya</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
