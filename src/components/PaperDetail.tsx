
import { useState } from 'react';
import { Paper } from '../types';
import { Calendar, Award, User, Bookmark, BookmarkCheck, ExternalLink, FileText } from 'lucide-react';

interface PaperDetailProps {
  paper: Paper;
  onSave: (paper: Paper) => void;
  isSaved: boolean;
}

const PaperDetail: React.FC<PaperDetailProps> = ({ paper, onSave, isSaved }) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{paper.title}</h1>
        
        <button
          onClick={() => onSave(paper)}
          className={`ml-2 p-2 rounded-full ${isSaved ? 'text-scholar-blue bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}
        >
          {isSaved ? <BookmarkCheck className="h-6 w-6" /> : <Bookmark className="h-6 w-6" />}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-scholar-blue" />
          <span>{new Date(paper.publishDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        {(paper.conference || paper.journal || paper.arxivId) && (
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1 text-scholar-blue" />
            <span>
              {paper.conference || paper.journal || (paper.arxivId ? 'arXiv' : '')}
              {paper.arxivId ? ` (${paper.arxivId})` : ''}
            </span>
          </div>
        )}
        
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1 text-scholar-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span>{paper.citations} citations</span>
        </div>
        
        {paper.primaryCategory && (
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1 text-scholar-blue" />
            <span>Primary: {paper.primaryCategory}</span>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Abstract</h2>
        <div className="prose max-w-none">
          <p className={`text-gray-700 ${!showFullAbstract && 'line-clamp-4'}`}>
            {paper.abstract}
          </p>
          {paper.abstract.length > 300 && (
            <button 
              className="text-scholar-blue hover:text-scholar-navy font-medium mt-2"
              onClick={() => setShowFullAbstract(!showFullAbstract)}
            >
              {showFullAbstract ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paper.authors.map(author => (
            <div key={author.id} className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-100">
              <div className="mr-3 mt-0.5">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{author.name}</div>
                {author.institution && (
                  <div className="text-sm text-gray-600">{author.institution}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {paper.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-scholar-blue"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {paper.pdfUrl && (
          <a 
            href={paper.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-scholar-blue text-white hover:bg-scholar-navy transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            View PDF
          </a>
        )}
        
        <a 
          href={paper.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on {paper.arxivId ? 'arXiv' : 'Original Source'}
        </a>
      </div>
    </div>
  );
};

export default PaperDetail;
