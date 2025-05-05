
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import PaperCard from '@/components/PaperCard';
import { Brain } from 'lucide-react';
import { Paper } from '@/types';
import { papers as mockPapers, filterCategories } from '@/data/papers';
import { fetchArxivPapers } from '@/services/arxivService';
import { 
  Pagination,
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [savedPaperIds, setSavedPaperIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  
  // Fetch arXiv papers with React Query
  const { 
    data: arxivPapers, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['arxivPapers', searchQuery, currentPage],
    queryFn: () => fetchArxivPapers(
      searchQuery, 
      resultsPerPage, 
      (currentPage - 1) * resultsPerPage
    ),
    refetchOnWindowFocus: false,
  });
  
  // Load saved papers from localStorage on component mount
  useEffect(() => {
    const savedPapers = localStorage.getItem('savedPapers');
    if (savedPapers) {
      setSavedPaperIds(new Set(JSON.parse(savedPapers)));
    }
  }, []);

  // Update filtered papers when arXiv papers change
  useEffect(() => {
    if (arxivPapers) {
      setFilteredPapers(arxivPapers);
    } else {
      // Use mock data until arXiv data loads
      setFilteredPapers(mockPapers);
    }
  }, [arxivPapers]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (!query.trim() && arxivPapers) {
      setFilteredPapers(arxivPapers);
      return;
    }
    
    // The actual search will be handled by the useQuery hook
    // which will refetch with the new search query
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
    
    // Apply filters if there are any active and we have arXiv papers
    const papersToFilter = arxivPapers || mockPapers;
    
    if (newFilters.size === 0) {
      setFilteredPapers(papersToFilter);
      return;
    }
    
    // Filter papers based on active filters
    const results = papersToFilter.filter(paper => {
      // Filter by conference/journal (arxiv vs others)
      if ([...newFilters].some(filter => filter.startsWith('conference-'))) {
        const conferenceFilters = [...newFilters].filter(f => f.startsWith('conference-'));
        if (conferenceFilters.length > 0) {
          const isArxiv = paper.journal?.toLowerCase() === 'arxiv' || 
                         paper.arxivId != null;
          
          const matches = conferenceFilters.some(filter => {
            const conf = filter.split('-')[1].toLowerCase();
            if (conf === 'arxiv') return isArxiv;
            return paper.conference?.toLowerCase() === conf || 
                   paper.journal?.toLowerCase() === conf;
          });
          
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
      
      // Filter by topic/category
      if ([...newFilters].some(filter => filter.startsWith('topic-'))) {
        const topicFilters = [...newFilters].filter(f => f.startsWith('topic-'));
        if (topicFilters.length > 0) {
          const matches = topicFilters.some(filter => {
            const topic = filter.split('-')[1].replace(/-/g, ' ').toLowerCase();
            return paper.tags.some(tag => tag.toLowerCase().includes(topic)) ||
                  paper.primaryCategory?.toLowerCase().includes(topic);
          });
          if (!matches) return false;
        }
      }
      
      return true;
    });
    
    setFilteredPapers(results);
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

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            Discover the latest research papers in computer vision from arXiv and beyond
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
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-scholar-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-gray-600">Loading papers from arXiv...</p>
              </div>
            )}
            
            {isError && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg 
                  className="mx-auto h-12 w-12 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading papers</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {error instanceof Error ? error.message : "Failed to fetch papers from arXiv. Please try again."}
                </p>
              </div>
            )}
            
            {!isLoading && !isError && filteredPapers.length === 0 ? (
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
            ) : !isLoading && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {searchQuery 
                      ? `Results for "${searchQuery}" (${filteredPapers.length})` 
                      : activeFilters.size > 0 
                        ? `Filtered Results (${filteredPapers.length})` 
                        : 'Latest arXiv Papers'}
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
                
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {[...Array(5)].map((_, i) => {
                        const pageNumber = i + 1;
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink 
                              isActive={pageNumber === currentPage}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
