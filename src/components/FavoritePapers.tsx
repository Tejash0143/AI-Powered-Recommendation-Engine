
import React from 'react';
import { Paper } from '../types';
import PaperCard from './PaperCard';

interface FavoritePapersProps {
  savedPapers: Paper[];
  toggleSavedPaper: (paper: Paper) => void;
}

const FavoritePapers: React.FC<FavoritePapersProps> = ({ savedPapers, toggleSavedPaper }) => {
  if (savedPapers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">No saved papers yet</h2>
        <p className="text-gray-600 mb-6">Papers you save will appear here for easy access</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Saved Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPapers.map((paper) => (
          <PaperCard 
            key={paper.id} 
            paper={paper} 
            onSave={toggleSavedPaper}
            isSaved={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritePapers;
