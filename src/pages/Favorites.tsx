
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FavoritePapers from '@/components/FavoritePapers';
import { useToast } from '@/hooks/use-toast';
import { papers } from '@/data/papers';
import { Paper } from '@/types';

const Favorites = () => {
  const { toast } = useToast();
  const [savedPapers, setSavedPapers] = useState<Paper[]>([]);
  
  // Load saved papers from localStorage on component mount
  useEffect(() => {
    const savedPaperIds = localStorage.getItem('savedPapers');
    if (savedPaperIds) {
      const ids = new Set(JSON.parse(savedPaperIds));
      const savedPapersList = papers.filter(paper => ids.has(paper.id));
      setSavedPapers(savedPapersList);
    }
  }, []);

  // Handle toggling saved state
  const handleToggleSavedPaper = (paper: Paper) => {
    // Get current saved paper IDs
    const savedPaperIds = localStorage.getItem('savedPapers');
    const idSet = new Set(savedPaperIds ? JSON.parse(savedPaperIds) : []);
    
    // Toggle the paper's saved state
    if (idSet.has(paper.id)) {
      idSet.delete(paper.id);
      toast({
        title: "Paper removed",
        description: "Paper removed from saved items",
      });
      
      // Update state and localStorage
      setSavedPapers(savedPapers.filter(p => p.id !== paper.id));
    } else {
      idSet.add(paper.id);
      toast({
        title: "Paper saved",
        description: "Paper added to your saved items",
      });
      
      // This shouldn't happen on this page, but just in case
      if (!savedPapers.find(p => p.id === paper.id)) {
        setSavedPapers([...savedPapers, paper]);
      }
    }
    
    localStorage.setItem('savedPapers', JSON.stringify([...idSet]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <FavoritePapers 
          savedPapers={savedPapers} 
          toggleSavedPaper={handleToggleSavedPaper} 
        />
      </div>
    </div>
  );
};

export default Favorites;
