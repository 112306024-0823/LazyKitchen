import React from 'react';
import type { Ingredient } from '../../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ 
  ingredient, 
  isSelected, 
  onToggle 
}) => {
  return (
    <div 
      className={`
        border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all
        ${isSelected ? 'border-green-500 bg-green-50 scale-105' : 'border-gray-200 hover:border-green-300'}
      `}
      onClick={() => onToggle(ingredient.id)}
    >
      {ingredient.imageUrl && (
        <div className="h-24 overflow-hidden">
          <img 
            src={ingredient.imageUrl} 
            alt={ingredient.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-3 flex justify-between items-center">
        <div>
          <p className="font-medium">{ingredient.name}</p>
          {ingredient.category && (
            <p className="text-xs text-gray-500">{ingredient.category}</p>
          )}
        </div>
        
        <div className={`
          w-5 h-5 rounded-full border flex items-center justify-center transition-colors
          ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'}
        `}>
          {isSelected && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-3 h-3 text-white"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientCard; 