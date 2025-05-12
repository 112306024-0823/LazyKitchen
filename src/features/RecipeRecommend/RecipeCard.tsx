import React from 'react';
import type { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipeId: string) => void;
  onToggleFavorite: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onViewDetails,
  onToggleFavorite 
}) => {
  // 計算總烹飪時間
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* 食譜圖片 */}
      <div className="relative h-48">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        
        {/* 收藏按鈕 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-70 flex items-center justify-center hover:bg-opacity-100 transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={recipe.isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className={`w-5 h-5 ${recipe.isFavorite ? 'text-red-500' : 'text-gray-600'}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
        
        {/* 難度標籤 */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-70">
          {recipe.difficulty}
        </div>
      </div>
      
      {/* 食譜內容 */}
      <div className="p-4" onClick={() => onViewDetails(recipe.id)}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span>{totalTime} 分鐘</span>
          </div>
        </div>
        
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        )}
        
        {/* 標籤 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* 社群數據 */}
        <div className="flex items-center text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center mr-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span>{recipe.communityStats.likes}</span>
          </div>
          
          <div className="flex items-center mr-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <span>{recipe.communityStats.comments}</span>
          </div>
          
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            <span>{recipe.communityStats.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 