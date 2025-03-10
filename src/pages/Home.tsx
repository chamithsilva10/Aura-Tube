import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import useYoutubeApi from '../hooks/useYoutubeApi';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import { useNavigate } from 'react-router-dom'; // For navigation

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('React tutorials'); // Default query
  const [selectedCategory, setSelectedCategory] = useState('Home'); // Track selected category
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null); // Track selected video
  const { videos, loading, error } = useYoutubeApi(searchQuery);
  const navigate = useNavigate(); // For navigation

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(category); // Update search query based on category
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const handleLogoClick = () => {
    setSelectedVideoId(null); // Clear selected video
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="flex flex-col">
      <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />
      <div className="flex">
        <Sidebar onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
        <div className="flex-1 p-4 ml-64 mt-16">
          {selectedVideoId ? (
            <VideoPlayer videoId={selectedVideoId} />
          ) : (
            <>
              {loading && <p className="text-center">Loading...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    channel={video.channel}
                    views={video.views}
                    timestamp={video.timestamp}
                    onClick={() => handleVideoClick(video.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;