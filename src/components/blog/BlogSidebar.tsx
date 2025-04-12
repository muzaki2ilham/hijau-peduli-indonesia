
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryItem {
  name: string;
  count: number;
}

interface ArchiveItem {
  month: string;
  count: number;
}

interface BlogSidebarProps {
  categories: CategoryItem[];
  archives: ArchiveItem[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ categories, archives }) => {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800 flex items-center">
            <Tag className="mr-2 h-5 w-5" /> Kategori
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex justify-between items-center text-gray-600 hover:text-green-700"
                >
                  <span>{category.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Archives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-800 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Arsip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {archives.map((archive) => (
              <li key={archive.month}>
                <Link
                  to={`/blog/archive/${archive.month.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex justify-between items-center text-gray-600 hover:text-green-700"
                >
                  <span>{archive.month}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {archive.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-green-50 border-green-100">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Berlangganan Newsletter</CardTitle>
          <CardDescription>
            Dapatkan artikel terbaru dan informasi lingkungan hidup langsung ke email Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input placeholder="Email Anda" className="bg-white" />
            <Button className="w-full bg-green-600 hover:bg-green-700">Berlangganan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
