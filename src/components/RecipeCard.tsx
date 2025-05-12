import React from 'react';
import type { Recipe } from '../types';
import Card, { CardContent, CardImage } from './ui/Card';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  return (
    <Card
      elevated
      hoverEffect
      onClick={handleClick}
      className="h-full flex flex-col"
    >
      <div className="relative">
        <CardImage 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="h-48 sm:h-56 md:h-64"
        />
        
        {/* 收藏按鈕 */}
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full ${
            recipe.isFavorite 
              ? 'bg-egg-300 text-egg-900' 
              : 'bg-white/70 text-gray-600 hover:bg-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            // 收藏功能邏輯 (待實現)
          }}
        >
          <svg 
            className="w-5 h-5" 
            fill={recipe.isFavorite ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
        
        {/* 難度標籤 */}
        <div className="absolute bottom-3 left-3 bg-forest-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">
          {recipe.difficulty}
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
        
        {recipe.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{recipe.description}</p>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{recipe.prepTime + recipe.cookTime} 分鐘</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{recipe.servings} 人份</span>
          </div>
        </div>
        
        {/* 標籤 */}
        <div className="flex flex-wrap gap-1 mt-3">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* 社群互動統計 */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{recipe.communityStats.likes}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{recipe.communityStats.comments}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span>{recipe.communityStats.shares}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard; 