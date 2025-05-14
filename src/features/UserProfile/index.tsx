// src/features/UserProfile/index.tsx
// UserProfile 功能模組進入點 
import React from 'react';
import { Link } from 'react-router-dom';
import UserProfileForm from './UserProfileForm';
import type { UserProfile } from '../../types';

// 麵包屑元件
const Breadcrumb = () => (
  <div className="flex items-center text-sm text-gray-500 mb-6">
    <div className="breadcrumb-item">
      <Link to="/" className="hover:text-tangerine-500">首頁</Link>
    </div>
    <div className="breadcrumb-item text-tangerine-500 font-medium">
      個人設定
    </div>
  </div>
);

const UserProfilePage: React.FC = () => {
  // 處理用戶資料儲存
  const handleSubmitProfile = (profile: UserProfile) => {
    console.log('儲存用戶設定:', profile);
    // 未來可整合到API或狀態管理
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="text-left max-w-3xl mx-auto">
        <Breadcrumb />
        
        <div className="food-decoration tomato">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">建立個人設定</h1>
          <p className="text-gray-600 mb-8">
            請告訴我們你的飲食偏好、烹飪技能、家中廚具等資訊，我們將為你提供更精準的食譜推薦。
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto food-decoration carrot">
        <UserProfileForm onSubmit={handleSubmitProfile} />
      
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '#/ingredient-input'}
            className="px-8 py-3 bg-tangerine-500 text-white rounded-full hover:bg-tangerine-600 focus:outline-none focus:ring-2 focus:ring-tangerine-500 shadow-md hover:shadow-lg transition-all btn-cooking font-medium"
          >
            下一步：進入食材輸入
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 