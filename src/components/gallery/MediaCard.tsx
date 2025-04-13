
import React from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BaseMediaProps {
  id: number;
  title: string;
  category: string;
}

interface PhotoProps extends BaseMediaProps {
  type: "photo";
  date: string;
  imageUrl: string;
}

interface VideoProps extends BaseMediaProps {
  type: "video";
  duration: string;
  thumbnailUrl: string;
}

type MediaCardProps = PhotoProps | VideoProps;

const MediaCard: React.FC<MediaCardProps> = (props) => {
  if (props.type === "photo") {
    return (
      <Card key={props.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative">
          <AspectRatio ratio={4/3} className="bg-gray-100 overflow-hidden">
            <img 
              src={props.imageUrl} 
              alt={props.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </AspectRatio>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-green-800 line-clamp-2">{props.title}</h3>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{props.date}</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {props.category}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card key={props.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <AspectRatio ratio={16/9} className="bg-gray-100">
          <img 
            src={props.thumbnailUrl} 
            alt={props.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 rounded-full p-3 transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
            {props.duration}
          </div>
        </AspectRatio>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-green-800 line-clamp-2">{props.title}</h3>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1 inline-block">
          {props.category}
        </span>
      </div>
    </Card>
  );
};

export default MediaCard;
