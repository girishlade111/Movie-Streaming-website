import { useState } from 'react';
import { categories } from '../constants/mockData';

interface CategoryNavProps {
  onCategorySelect?: (category: string) => void;
}

export default function CategoryNav({ onCategorySelect }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const allCategories = [
    { id: 'all', name: 'All', type: 'filter' as const },
    ...categories,
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategorySelect?.(categoryId);
  };

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 py-3">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
