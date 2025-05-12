import React from 'react';
import type { Ingredient } from '../types';
import Card from './ui/Card';

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected?: boolean;
  onSelect?: (ingredient: Ingredient) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  isSelected = false,
  onSelect,
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(ingredient);
    }
  };

  return (
    <Card
      elevated={isSelected}
      hoverEffect={true}
      onClick={handleSelect}
      className={`h-full transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-forest-500 ring-offset-2' 
          : 'hover:border-gray-300'
      }`}
      bordered
    >
      <div className="aspect-square overflow-hidden">
        {ingredient.imageUrl ? (
          <img
            src={ingredient.imageUrl}
            alt={ingredient.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-800">{ingredient.name}</h3>
        {ingredient.category && (
          <span className="inline-block mt-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {ingredient.category}
          </span>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 bg-forest-500 text-white p-1 rounded-full">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </Card>
  );
};

export default IngredientCard; 