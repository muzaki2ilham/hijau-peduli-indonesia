
import React from "react";
import MediaCard from "./MediaCard";

interface Video {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
}

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => (
        <MediaCard
          key={video.id}
          type="video"
          id={video.id}
          title={video.title}
          category={video.category}
          duration={video.duration}
          thumbnailUrl={video.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
