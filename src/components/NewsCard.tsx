
import React from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

const NewsCard = ({ id, title, date, excerpt, image, category }: NewsCardProps) => {
  return (
    <div className="card group">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <span className="text-sm text-gray-500 mb-2 block">{date}</span>
        <h3 className="text-lg font-semibold text-green-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          to={`/blog/${id}`} 
          className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
        >
          Baca selengkapnya
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
