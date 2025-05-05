
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import PaperDetail from '@/components/PaperDetail';
import { papers } from '@/data/papers';
import { Paper } from '@/types';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [savedPaperIds, setSavedPaperIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved papers from localStorage and find the requested paper
  useEffect(() => {
    // Load saved papers
    const savedPapers = localStorage.getItem('savedPapers');
    if (savedPapers) {
      setSavedPaperIds(new Set(JSON.parse(savedPapers)));
    }
    
    // Find the requested paper - ensure ID is definitely a string
    const paperId = id || '';
    const foundPaper = papers.find(p => p.id === paperId);
    
    if (foundPaper) {
      setPaper(foundPaper);
    } else {
      console.error(`Paper with ID "${paperId}" not found`);
      toast({
        title: "Paper not found",
        description: "The requested paper could not be found",
        variant: "destructive",
      });
      // Navigate to home only after toast is shown
      setTimeout(() => navigate('/'), 1000);
    }
    
    setIsLoading(false);
  }, [id, navigate, toast]);

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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scholar-blue"></div>
          </div>
        ) : paper ? (
          <PaperDetail 
            paper={paper} 
            onSave={handleSavePaper}
            isSaved={savedPaperIds.has(paper.id)}
          />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">Paper not found</h2>
            <p className="text-gray-600 mb-6">The paper you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-scholar-blue text-white rounded-md hover:bg-scholar-navy transition-colors"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
