
import React, { useState } from 'react';
import { FilterCategory } from '../types';

interface FilterBarProps {
  categories: FilterCategory[];
  onFilterChange: (filterId: string, value: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, onFilterChange }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Filter Papers</h2>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border-b pb-3 last:border-b-0 last:pb-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-scholar-blue focus:outline-none"
            >
              <span>{category.name}</span>
              <span className="text-sm">
                {expandedCategory === category.id ? '−' : '+'}
              </span>
            </button>
            
            {expandedCategory === category.id && (
              <div className="mt-2 pl-2 space-y-1">
                {category.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${category.id}-${option.id}`}
                      className="h-4 w-4 rounded border-gray-300 text-scholar-blue focus:ring-scholar-blue"
                      onChange={(e) => onFilterChange(`${category.id}-${option.id}`, e.target.checked)}
                    />
                    <label
                      htmlFor={`${category.id}-${option.id}`}
                      className="ml-2 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
