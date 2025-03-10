import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetail: React.FC = () => {
  const videoId = 'dQw4w9WgXcQ'; // Example video ID

  return (
    <div className="flex">
      <div className="w-64">
        {/* Sidebar */}
      </div>
      <div className="flex-1 p-4">
        <VideoPlayer videoId={videoId} />
        {/* Add more details like comments, suggested videos, etc. */}
      </div>
    </div>
  );
};

export default VideoDetail;