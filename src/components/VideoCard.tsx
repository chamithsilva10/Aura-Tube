import React from 'react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  timestamp: string;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, channel, views, timestamp, onClick }) => {
  return (
    <div className="w-full cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{channel}</p>
        <p className="text-sm text-gray-600">{views} views • {timestamp}</p>
      </div>
    </div>
  );
};

export default VideoCard;