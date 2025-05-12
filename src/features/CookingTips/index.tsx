// src/features/CookingTips/index.tsx
// CookingTips 功能模組進入點 
import React, { useState } from 'react';
import { mockCookingTips } from '../../mocks/data';
import TipCard from './TipCard';
import type { CookingTip } from '../../types';

const CookingTipsPage: React.FC = () => {
  // 技巧列表
  const [tips, setTips] = useState<CookingTip[]>(mockCookingTips);
  // 活躍的分類過濾
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 處理收藏切換
  const handleToggleFavorite = (tipId: string) => {
    setTips(prevTips => 
      prevTips.map(tip => 
        tip.id === tipId 
          ? { ...tip, isFavorite: !tip.isFavorite } 
          : tip
      )
    );
  };
  
  // 根據分類過濾技巧
  const filteredTips = activeCategory 
    ? tips.filter(tip => tip.category === activeCategory)
    : tips;
  
  // 所有技巧分類
  const categories = [
    { id: 'prep', name: '🔪 食材處理', value: '食材處理' },
    { id: 'cooking', name: '🍳 烹飪方法', value: '烹飪方法' },
    { id: 'flavor', name: '🧂 調味技巧', value: '調味技巧' },
    { id: 'save', name: '📦 保存方法', value: '保存方法' },
    { id: 'time', name: '⏱️ 時間管理', value: '時間管理' },
  ];
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="food-decoration rice mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">烹飪小技巧</h1>
        <p className="text-gray-600 mb-6">
          實用的廚房技巧，讓你輕鬆煮出美味，成為廚房裡的大師！
        </p>
      </div>
      
      {/* 分類標籤 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${activeCategory === null 
              ? 'bg-cherry-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          全部
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(activeCategory === category.value ? null : category.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category.value 
                ? 'bg-cherry-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 烹飪技巧列表 */}
      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map(tip => (
            <TipCard
              key={tip.id}
              tip={tip}
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
          <h3 className="text-lg font-medium text-gray-700 mb-2">沒有找到符合的烹飪技巧</h3>
          <p className="text-gray-500">
            請嘗試其他分類或移除過濾條件
          </p>
        </div>
      )}
      
      {/* 分享技巧按鈕 */}
      <div className="mt-12 text-center">
        <button
          onClick={() => alert('分享技巧功能即將推出！')}
          className="px-6 py-3 bg-sunflower-300 text-gray-800 rounded-full hover:bg-sunflower-400 focus:outline-none focus:ring-2 focus:ring-sunflower-300 shadow-md transition-colors inline-flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-5 h-5 mr-2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
          分享你的烹飪技巧
        </button>
      </div>
    </div>
  );
};

export default CookingTipsPage; 