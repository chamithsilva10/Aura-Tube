import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-64 rounded-l-lg focus:outline-none focus:border-blue-500"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300 transition-colors duration-200"
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;