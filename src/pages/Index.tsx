
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PaperCard from '@/components/PaperCard';
import { Brain } from 'lucide-react';
import { Paper } from '@/types';
import { papers, filterCategories } from '@/data/papers';

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [savedPaperIds, setSavedPaperIds] = useState<Set<string>>(new Set());
  
  // Load saved papers from localStorage on component mount
  useEffect(() => {
    const savedPapers = localStorage.getItem('savedPapers');
    if (savedPapers) {
      setSavedPaperIds(new Set(JSON.parse(savedPapers)));
    }
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPapers(papers);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = papers.filter(paper => 
      paper.title.toLowerCase().includes(lowerQuery) ||
      paper.abstract.toLowerCase().includes(lowerQuery) ||
      paper.authors.some(author => author.name.toLowerCase().includes(lowerQuery)) ||
      paper.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    
    setFilteredPapers(results);
  };

  // Handle filter changes
  const handleFilterChange = (filterId: string, isActive: boolean) => {
    const newFilters = new Set(activeFilters);
    
    if (isActive) {
      newFilters.add(filterId);
    } else {
      newFilters.delete(filterId);
    }
    
    setActiveFilters(newFilters);
    
    // Apply filters if there are any active
    if (newFilters.size === 0) {
      handleSearch(searchQuery); // Reset to search results only
      return;
    }
    
    // Filter papers based on active filters
    const results = papers.filter(paper => {
      // Filter by conference
      if ([...newFilters].some(filter => filter.startsWith('conference-'))) {
        const conferenceFilters = [...newFilters].filter(f => f.startsWith('conference-'));
        if (conferenceFilters.length > 0 && paper.conference) {
          const matches = conferenceFilters.some(filter => 
            filter.split('-')[1].toLowerCase() === paper.conference?.toLowerCase()
          );
          if (!matches) return false;
        }
      }
      
      // Filter by year
      if ([...newFilters].some(filter => filter.startsWith('year-'))) {
        const yearFilters = [...newFilters].filter(f => f.startsWith('year-'));
        if (yearFilters.length > 0) {
          const paperYear = new Date(paper.publishDate).getFullYear().toString();
          const matches = yearFilters.some(filter => filter.split('-')[1] === paperYear);
          if (!matches) return false;
        }
      }
      
      // Filter by topic
      if ([...newFilters].some(filter => filter.startsWith('topic-'))) {
        const topicFilters = [...newFilters].filter(f => f.startsWith('topic-'));
        if (topicFilters.length > 0) {
          const matches = topicFilters.some(filter => {
            const topic = filter.split('-')[1].replace(/-/g, ' ').toLowerCase();
            return paper.tags.some(tag => tag.toLowerCase().includes(topic));
          });
          if (!matches) return false;
        }
      }
      
      return true;
    });
    
    // Apply search query if present
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      const searchResults = results.filter(paper => 
        paper.title.toLowerCase().includes(lowerQuery) ||
        paper.abstract.toLowerCase().includes(lowerQuery) ||
        paper.authors.some(author => author.name.toLowerCase().includes(lowerQuery)) ||
        paper.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
      setFilteredPapers(searchResults);
    } else {
      setFilteredPapers(results);
    }
  };

  // Handle saving papers
  const handleSavePaper = (paper: Paper) => {
    const newSavedPaperIds = new Set(savedPaperIds);
    
    if (newSavedPaperIds.has(paper.id)) {
      newSavedPaperIds.delete(paper.id);
      toast({
        title: "Paper removed",
        description: "Paper removed from saved items",
      });
    } else {
      newSavedPaperIds.add(paper.id);
      toast({
        title: "Paper saved",
        description: "Paper added to your saved items",
      });
    }
    
    setSavedPaperIds(newSavedPaperIds);
    localStorage.setItem('savedPapers', JSON.stringify([...newSavedPaperIds]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-10 w-10 text-scholar-blue mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">CV Scholar</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest research papers in computer vision, machine learning, and AI
          </p>
        </div>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterBar 
              categories={filterCategories}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="md:col-span-3">
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No papers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {searchQuery || activeFilters.size > 0 
                      ? `Results (${filteredPapers.length})` 
                      : 'Latest Research Papers'}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredPapers.map((paper) => (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      onSave={handleSavePaper}
                      isSaved={savedPaperIds.has(paper.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
