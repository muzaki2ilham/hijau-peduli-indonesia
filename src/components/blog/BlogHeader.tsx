
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const BlogHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Blog Lingkungan Hidup</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Artikel dan wawasan terkini tentang lingkungan hidup, program konservasi, dan praktik berkelanjutan.
      </p>
      
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mt-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          placeholder="Cari artikel..."
          className="pl-10 bg-white"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
