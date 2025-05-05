
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search computer vision papers, authors, or topics..."
          className="w-full py-3 px-5 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scholar-blue focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-scholar-blue"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
