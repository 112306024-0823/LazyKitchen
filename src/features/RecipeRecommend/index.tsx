// src/features/RecipeRecommend/index.tsx
// RecipeRecommend 功能模組進入點 
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import ChatbotModal from '../Chatbot/ChatbotModal';
import { mockRecipes } from '../../mocks/data';
import type { Recipe } from '../../types';

const RecipeRecommendPage: React.FC = () => {
  // 食譜列表
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  // 活躍的標籤過濾
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // 顯示模式：網格或列表
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // 聊天機器人狀態
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // 處理收藏切換
  const handleToggleFavorite = (recipeId: string) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, isFavorite: !recipe.isFavorite } 
          : recipe
      )
    );
  };
  
  // 處理查看食譜詳情
  const handleViewDetails = (recipeId: string) => {
    console.log('查看食譜詳情:', recipeId);
    // 未來可以導航到食譜詳情頁面
    window.location.href = `#/recipe-detail/${recipeId}`;
  };
  
  // 根據標籤過濾食譜
  const filteredRecipes = activeTag 
    ? recipes.filter(recipe => recipe.tags.includes(activeTag))
    : recipes;
  
  // 推薦標籤（熱門、季節性等）
  const recommendedTags = [
    { id: 'hot', name: '🔥 熱門', tag: '家常菜' },
    { id: 'protein', name: '💪 高蛋白', tag: '高蛋白' },
    { id: 'simple', name: '🧂 極簡料理', tag: '簡易' },
    { id: 'season', name: '📅 季節推薦', tag: '快速' },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">為你推薦的食譜</h1>
      <p className="text-gray-600 mb-6">
        根據你的食材和偏好，我們為你推薦以下食譜。
      </p>
      
      {/* 推薦標籤 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {recommendedTags.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTag(activeTag === item.tag ? null : item.tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeTag === item.tag 
                ? 'bg-tangerine-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {item.name}
          </button>
        ))}
      </div>
      
      {/* 視圖切換 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          找到 {filteredRecipes.length} 個符合的食譜
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
            aria-label="網格視圖"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
              />
            </svg>
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
            aria-label="列表視圖"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 10h16M4 14h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 食譜列表 */}
      {filteredRecipes.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' 
            : 'space-y-4'}
        `}>
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={handleViewDetails}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">沒有找到符合的食譜</h3>
          <p className="text-gray-500">
            請嘗試其他食材組合或移除過濾條件
          </p>
        </div>
      )}
      
      {/* 下一步按鈕 */}
      <div className="mt-10 flex justify-between">
        <button
          onClick={() => window.location.href = '#/ingredient-input'}
          className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          返回食材輸入
        </button>
        
        {filteredRecipes.length > 0 && (
          <button
            onClick={() => window.location.href = `#/recipe-detail/${filteredRecipes[0].id}`}
            className="px-6 py-2 bg-tangerine-500 text-white rounded-full hover:bg-tangerine-600 focus:outline-none focus:ring-2 focus:ring-tangerine-500"
          >
            查看推薦食譜
          </button>
        )}
      </div>
      
      {/* 聊天機器人按鈕 */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-tangerine-500 rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:bg-tangerine-600 transition-all duration-300 hover:scale-110"
        aria-label="開啟食譜助手"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
      {/* 聊天機器人模態框 */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        recipes={recipes}
        onSelectRecipe={handleViewDetails}
      />
    </div>
  );
};

export default RecipeRecommendPage; 