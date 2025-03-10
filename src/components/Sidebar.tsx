import React from 'react';
import { FaHome, FaFire, FaHistory, FaThumbsUp, FaMusic, FaGamepad, FaFutbol } from 'react-icons/fa';
import { MdSubscriptions, MdMore } from 'react-icons/md';

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, selectedCategory }) => {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  // Temporary workaround: Cast icons to `any` to bypass TypeScript errors
  const FaHomeIcon = FaHome as any;
  const FaFireIcon = FaFire as any;
  const MdSubscriptionsIcon = MdSubscriptions as any;
  const FaHistoryIcon = FaHistory as any;
  const FaThumbsUpIcon = FaThumbsUp as any;
  const FaMusicIcon = FaMusic as any;
  const FaGamepadIcon = FaGamepad as any;
  const FaFutbolIcon = FaFutbol as any;
  const MdMoreIcon = MdMore as any;

  return (
    <div className="w-64 bg-white shadow-md fixed h-full p-4 mt-16 z-20">
      {/* Main Categories */}
      <ul>
        <li
          className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
            selectedCategory === 'Home' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleCategoryClick('Home')}
        >
          <FaHomeIcon className="mr-2" />
          Home
        </li>
        <li
          className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
            selectedCategory === 'Shorts' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleCategoryClick('Shorts')}
        >
          <FaFireIcon className="mr-2" />
          Shorts
        </li>
        <li
          className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
            selectedCategory === 'Subscriptions' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleCategoryClick('Subscriptions')}
        >
          <MdSubscriptionsIcon className="mr-2" />
          Subscriptions
        </li>
      </ul>

      {/* You Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">You</h3>
        <ul>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'History' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('History')}
          >
            <FaHistoryIcon className="mr-2" />
            History
          </li>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'Liked Videos' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('Liked Videos')}
          >
            <FaThumbsUpIcon className="mr-2" />
            Liked Videos
          </li>
        </ul>
      </div>

      {/* Explore Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Explore</h3>
        <ul>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'Trending' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('Trending')}
          >
            <FaFireIcon className="mr-2" />
            Trending
          </li>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'Music' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('Music')}
          >
            <FaMusicIcon className="mr-2" />
            Music
          </li>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'Gaming' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('Gaming')}
          >
            <FaGamepadIcon className="mr-2" />
            Gaming
          </li>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'Sports' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('Sports')}
          >
            <FaFutbolIcon className="mr-2" />
            Sports
          </li>
        </ul>
      </div>

      {/* Sign In Section */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700 transition-colors duration-200">
          Sign In
        </button>
      </div>

      {/* More from YouTube */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">More from YouTube</h3>
        <ul>
          <li
            className={`py-2 flex items-center hover:bg-gray-100 rounded-lg p-2 cursor-pointer transition-colors duration-200 ${
              selectedCategory === 'YouTube Premium' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick('YouTube Premium')}
          >
            <MdMoreIcon className="mr-2" />
            YouTube Premium
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;