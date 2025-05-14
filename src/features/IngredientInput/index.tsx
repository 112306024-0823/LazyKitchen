// src/features/IngredientInput/index.tsx
// IngredientInput 功能模組進入點 
import React, { useState, useRef } from 'react';
import IngredientCard from './IngredientCard';
import { mockIngredients } from '../../mocks/data';
import type { Ingredient } from '../../types';
import { recognizeFoodFromImage, simulateFoodRecognition, mapRecognizedIngredientsToLocal } from '../../services/imageRecognition';

const IngredientInputPage: React.FC = () => {
  // 所有可用食材
  const [ingredients] = useState<Ingredient[]>(mockIngredients);
  // 已選擇的食材ID
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
  // 搜尋關鍵字
  const [searchKeyword, setSearchKeyword] = useState('');
  // 顯示相機上傳區域
  const [showCameraUpload, setShowCameraUpload] = useState(false);
  // 處理中狀態
  const [processing, setProcessing] = useState(false);
  // 分類篩選
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // 檔案輸入引用
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 切換食材選擇狀態
  const toggleIngredient = (id: string) => {
    if (selectedIngredientIds.includes(id)) {
      setSelectedIngredientIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIngredientIds(prev => [...prev, id]);
    }
  };

  // 過濾食材
  const filteredIngredients = ingredients.filter(item => {
    // 搜尋關鍵字篩選
    const matchesKeyword = !searchKeyword || 
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchKeyword.toLowerCase()));
    
    // 分類篩選
    const matchesCategory = !activeCategory || item.category === activeCategory;
    
    return matchesKeyword && matchesCategory;
  });

  // 獲取已選擇的食材
  const selectedIngredients = ingredients.filter(item => selectedIngredientIds.includes(item.id));

  // 處理相機上傳（連接到API）
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // 顯示處理中狀態
    setProcessing(true);
    
    try {
      let result;
      
      // 根據環境決定使用實際API還是模擬數據
      if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
        // 開發環境使用模擬數據
        result = await simulateFoodRecognition(ingredients);
      } else {
        // 生產環境使用實際API
        result = await recognizeFoodFromImage(files[0]);
      }
      
      if (!result.success) {
        throw new Error(result.error || '食材辨識失敗');
      }
      
      console.log('辨識結果:', result.ingredients);
      
      // 將API返回的食材映射到本地數據
      const recognizedIngredientIds = mapRecognizedIngredientsToLocal(
        result.ingredients,
        ingredients
      );
      
      // 更新已選擇的食材
      if (recognizedIngredientIds.length > 0) {
        setSelectedIngredientIds(prev => [...new Set([...prev, ...recognizedIngredientIds])]);
      } else {
        // 如果沒有識別到任何食材，顯示提示
        alert('未能識別任何食材，請嘗試拍攝更清晰的照片或手動選擇食材。');
      }
      
    } catch (error) {
      console.error('食材辨識API錯誤:', error);
      alert('食材辨識失敗，請稍後再試或手動選擇食材。');
      
    } finally {
      // 無論成功失敗都要執行的清理操作
      setShowCameraUpload(false);
      setProcessing(false);
      
      // 清空文件輸入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 獲取所有可用的食材分類
  const categories = Array.from(new Set(ingredients.map(item => item.category).filter(Boolean) as string[]));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="food-decoration rice mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">你的冰箱有什麼？</h1>
        <p className="text-gray-600 mb-6">
          選擇或搜尋你家中現有的食材，我們將為你推薦最適合的美味食譜。
        </p>
      </div>

      {/* 搜尋與拍照辨識 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜尋食材..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 bg-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setShowCameraUpload(true)}
          className="px-4 py-3 bg-cherry-500 text-white rounded-lg flex items-center justify-center hover:bg-cherry-600 focus:outline-none focus:ring-2 focus:ring-cherry-500 transition-colors shadow-sm"
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
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          拍照辨識食材
        </button>
      </div>

      {/* 分類篩選 */}
      <div className="flex flex-wrap gap-2 mb-6">
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
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category 
                ? 'bg-cherry-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 相機上傳區域 */}
      {showCameraUpload && (
        <div className="mb-6 p-6 border-2 border-dashed border-cherry-200 rounded-lg bg-cherry-50">
          <div className="text-center">
            {processing ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cherry-500 mb-4"></div>
                <h3 className="text-lg font-medium mb-2">正在分析您的照片...</h3>
                <p className="text-gray-500">
                  AI正在辨識照片中的食材，請稍候
                </p>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-16 h-16 text-cherry-400 mx-auto mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium mb-3">上傳冰箱或食材照片</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  拍攝冰箱或食材照片，AI 將自動辨識可見的食材，幫你節省輸入時間
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <label className="inline-flex items-center justify-center px-4 py-3 bg-tangerine-500 text-white rounded-lg cursor-pointer hover:bg-tangerine-600 transition-colors shadow-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                    <span>拍攝新照片</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                    />
                  </label>
                  <label className="inline-flex items-center justify-center px-4 py-3 bg-sunflower-300 text-gray-800 rounded-lg cursor-pointer hover:bg-sunflower-400 transition-colors shadow-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>從相簿選擇</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <button
                  onClick={() => setShowCameraUpload(false)}
                  className="mt-5 text-gray-500 hover:text-gray-700 inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  關閉
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 已選擇的食材 */}
      {selectedIngredientIds.length > 0 && (
        <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">已選擇的食材 <span className="text-tangerine-500">({selectedIngredientIds.length})</span></h2>
            <button
              onClick={() => setSelectedIngredientIds([])}
              className="text-sm text-gray-500 hover:text-tangerine-500 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              清空所有
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map(ingredient => (
              <span
                key={ingredient.id}
                className="bg-tangerine-50 text-tangerine-700 text-sm px-3 py-1.5 rounded-full flex items-center border border-tangerine-100"
              >
                {ingredient.imageUrl && (
                  <img src={ingredient.imageUrl} alt={ingredient.name} className="w-4 h-4 rounded-full object-cover mr-1.5" />
                )}
                {ingredient.name}
                <button
                  onClick={() => toggleIngredient(ingredient.id)}
                  className="ml-1.5 text-tangerine-400 hover:text-tangerine-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 食材選擇網格 */}
      {filteredIngredients.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredIngredients.map(ingredient => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              isSelected={selectedIngredientIds.includes(ingredient.id)}
              onToggle={toggleIngredient}
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
          <h3 className="text-lg font-medium text-gray-700 mb-2">沒有找到符合的食材</h3>
          <p className="text-gray-500">
            請嘗試其他關鍵字或移除過濾條件
          </p>
        </div>
      )}

      {/* 底部操作區 */}
      <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-4">
        <button
          onClick={() => window.location.href = '#/user-profile'}
          className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          返回個人設定
        </button>
        
        <button
          onClick={() => window.location.href = '#/recipe-recommend'}
          className={`
            order-1 sm:order-2 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-tangerine-500 flex items-center justify-center font-medium
            ${selectedIngredientIds.length === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-tangerine-500 text-white hover:bg-tangerine-600 shadow-sm transition-colors'}
          `}
          disabled={selectedIngredientIds.length === 0}
        >
          {selectedIngredientIds.length === 0 ? (
            '請至少選擇一項食材'
          ) : (
            <>
              前往食譜推薦
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IngredientInputPage; 