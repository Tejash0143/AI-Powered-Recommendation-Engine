
import { Link } from 'react-router-dom';
import { BookOpen, Users, Tag, FileText, Image } from 'lucide-react';
import { Paper } from '../types';

interface PaperCardProps {
  paper: Paper;
  onSave: (paper: Paper) => void;
  isSaved: boolean;
}

// Helper function to get placeholder image based on paper tags
const getPlaceholderImage = (paper: Paper): string => {
  if (!paper.tags || paper.tags.length === 0) {
    return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=300';
  }
  
  const tag = paper.tags[0].toLowerCase();
  
  if (tag.includes('transformer') || tag.includes('vision transformer')) {
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&h=300';
  } else if (tag.includes('object') || tag.includes('detection')) {
    return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=300';
  } else if (tag.includes('3d') || tag.includes('scene')) {
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=300';
  } else if (tag.includes('medical') || tag.includes('segmentation')) {
    return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=300';
  } else if (tag.includes('contrastive') || tag.includes('self-supervised')) {
    return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=300';
  } else {
    return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=300';
  }
};

const PaperCard: React.FC<PaperCardProps> = ({ paper, onSave, isSaved }) => {
  // Use the paper's imageUrl if available, otherwise use a placeholder based on tags
  const imageUrl = paper.imageUrl || getPlaceholderImage(paper);
  
  return (
    <div className="paper-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={paper.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/paper/${paper.id}`}>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-scholar-blue">
                {paper.title}
              </h3>
            </Link>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Users className="h-4 w-4 mr-1" />
              <span>
                {paper.authors.length > 2
                  ? `${paper.authors[0].name} et al.`
                  : paper.authors.map(a => a.name).join(', ')}
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => onSave(paper)}
            className={`ml-2 p-2 rounded-full ${isSaved ? 'text-scholar-blue bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}
            aria-label={isSaved ? "Unsave paper" : "Save paper"}
          >
            <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {paper.abstract}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {paper.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-scholar-blue"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>
              {paper.conference || paper.journal || 'Publication'}
            </span>
          </div>
          
          <span>
            {new Date(paper.publishDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
          
          <div className="flex items-center">
            {paper.pdfUrl && (
              <a 
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-scholar-blue hover:underline flex items-center mr-3"
              >
                <FileText className="h-3 w-3 mr-1" />
                PDF
              </a>
            )}
            
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              {paper.citations} {paper.citations === 1 ? 'citation' : 'citations'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
