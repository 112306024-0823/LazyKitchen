import React from 'react';
import type { CookingTip } from '../../types';

interface TipCardProps {
  tip: CookingTip;
  onToggleFavorite: (tipId: string) => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* 卡片頭部 - 技巧圖片 */}
      {tip.imageUrl && (
        <div className="relative h-48">
          <img 
            src={tip.imageUrl}
            alt={tip.title}
            className="w-full h-full object-cover"
          />
          
          {/* 分類標籤 */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 shadow-sm">
            {tip.category}
          </div>
          
          {/* 收藏按鈕 */}
          <button 
            onClick={() => onToggleFavorite(tip.id)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center transition-all shadow-sm hover:bg-opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={tip.isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-5 h-5 ${tip.isFavorite ? 'text-cherry-500' : 'text-gray-600'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      )}
      
      {/* 卡片內容 */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
        <p className="text-gray-600 mb-4">{tip.content}</p>
        
        {/* 卡片底部 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-500">發布於 {tip.dateAdded}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={tip.isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 mr-1 text-cherry-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{tip.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCard; 