
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Search, BookOpen, Bookmark } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold text-scholar-navy">
          <Brain className="h-6 w-6 text-scholar-blue" />
          <span>CV Scholar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-scholar-blue transition-colors">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Link>
          <Link to="/favorites" className="flex items-center space-x-1 text-gray-700 hover:text-scholar-blue transition-colors">
            <Bookmark className="h-4 w-4" />
            <span>Saved Papers</span>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-700"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <Link 
              to="/" 
              className="flex items-center py-3 px-4 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Link>
            <Link 
              to="/favorites" 
              className="flex items-center py-3 px-4 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              <span>Saved Papers</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
