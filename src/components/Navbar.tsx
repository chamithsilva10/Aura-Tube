import React from 'react';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onLogoClick }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full z-10">
      <div className="flex items-center">
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="YouTube Logo"
          className="h-8 cursor-pointer" // Add cursor-pointer
          onClick={onLogoClick} // Handle logo click
        />
      </div>
      <div className="flex items-center">
        <SearchBar onSearch={onSearch} />
        <button className="bg-red-600 text-white px-4 py-2 rounded ml-4 hover:bg-red-700 transition-colors duration-200">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;