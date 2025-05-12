// src/features/RecipeDetail/index.tsx
// RecipeDetail 功能模組進入點 
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../../types';
import { mockRecipes } from '../../mocks/data';

// 麵包屑元件
const Breadcrumb = ({ recipe }: { recipe: Recipe }) => (
  <div className="flex items-center text-sm text-gray-500 mb-6">
    <div className="breadcrumb-item">
      <Link to="/" className="hover:text-cherry-500">首頁</Link>
    </div>
    <div className="breadcrumb-item">
      <Link to="/recipe-recommend" className="hover:text-cherry-500">食譜推薦</Link>
    </div>
    <div className="breadcrumb-item text-cherry-500 font-medium">
      {recipe.title}
    </div>
  </div>
);

// 食譜標題區塊
const RecipeHero = ({ recipe }: { recipe: Recipe }) => (
  <div className="relative food-decoration">
    <div className="w-full max-h-96 overflow-hidden rounded-xl">
      <img 
        src={recipe.imageUrl} 
        alt={recipe.title} 
        className="w-full object-cover"
      />
    </div>
    
    <div className="mt-6 md:mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{recipe.title}</h1>
        <button className="text-cherry-500 hover:text-cherry-600 focus:outline-none">
          <svg className="w-8 h-8" fill={recipe.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {recipe.description && (
        <p className="mt-3 text-gray-600">{recipe.description}</p>
      )}
      
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// 食譜信息統計
const RecipeStats = ({ recipe }: { recipe: Recipe }) => (
  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-cherry-500 mb-1">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-sm text-gray-500">準備時間</div>
      <div className="font-medium">{recipe.prepTime} 分鐘</div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-cherry-500 mb-1">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div className="text-sm text-gray-500">份量</div>
      <div className="font-medium">{recipe.servings} 人份</div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-cherry-500 mb-1">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="text-sm text-gray-500">烹飪時間</div>
      <div className="font-medium">{recipe.cookTime} 分鐘</div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-cherry-500 mb-1">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <div className="text-sm text-gray-500">難度</div>
      <div className="font-medium">{recipe.difficulty}</div>
    </div>
  </div>
);

// 食材列表
const IngredientsList = ({ recipe }: { recipe: Recipe }) => (
  <div className="mt-10 food-decoration bread">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">食材 <span className="text-sm text-gray-500 font-normal">({recipe.servings} 人份)</span></h2>
    
    <div className="bg-sunflower-50 rounded-lg p-6">
      <ul className="divide-y divide-sunflower-100">
        {recipe.ingredients.map((item, index) => (
          <li key={index} className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-full mr-3 shadow-sm">
                {item.ingredient.imageUrl ? (
                  <img src={item.ingredient.imageUrl} alt={item.ingredient.name} className="w-10 h-10 object-cover rounded-full" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-gray-800">{item.ingredient.name}</span>
            </div>
            <span className="text-gray-600">{item.amount} {item.unit}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// 烹飪步驟
const CookingSteps = ({ recipe }: { recipe: Recipe }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  return (
    <div className="mt-10 food-decoration carrot">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">步驟</h2>
      
      <div className="bg-cherry-50 rounded-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`p-2 rounded-full ${currentStep === 0 ? 'text-gray-300' : 'text-cherry-500 hover:bg-cherry-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className="text-sm text-cherry-600">步驟 {currentStep + 1} / {recipe.steps.length}</div>
            <div className="w-full bg-cherry-100 h-1 rounded-full mt-2">
              <div 
                className="bg-cherry-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / recipe.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentStep(prev => Math.min(recipe.steps.length - 1, prev + 1))}
            disabled={currentStep === recipe.steps.length - 1}
            className={`p-2 rounded-full ${currentStep === recipe.steps.length - 1 ? 'text-gray-300' : 'text-cherry-500 hover:bg-cherry-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-800 mb-4">
            {recipe.steps[currentStep].description}
          </div>
          
          {recipe.steps[currentStep].imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <img 
                src={recipe.steps[currentStep].imageUrl} 
                alt={`步驟 ${currentStep + 1}`}
                className="w-full object-cover" 
              />
            </div>
          )}
          
          {recipe.steps[currentStep].timer && (
            <div className="mt-4 flex items-center justify-center">
              <button className="flex items-center px-4 py-2 bg-cherry-100 text-cherry-600 rounded-full hover:bg-cherry-200 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>設定 {recipe.steps[currentStep].timer} 秒計時器</span>
              </button>
            </div>
          )}
        </div>
        
        {/* 步驟導航 */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {recipe.steps.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentStep 
                  ? 'bg-cherry-500 text-white' 
                  : index < currentStep 
                    ? 'bg-cherry-200 text-cherry-600' 
                    : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 社區評論
const CommunitySection = ({ recipe }: { recipe: Recipe }) => (
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">社區互動</h2>
    
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex space-x-6 mb-6">
        <div className="flex flex-col items-center">
          <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-cherry-500 hover:bg-cherry-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <div className="mt-2 text-sm font-medium">{recipe.communityStats.likes}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <div className="mt-2 text-sm font-medium">{recipe.communityStats.comments}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <div className="mt-2 text-sm font-medium">{recipe.communityStats.shares}</div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="分享你的烹飪心得..."
              className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent" 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex text-center">
            <div className="flex-1 py-3">
              <button className="text-cherry-500 btn-cooking font-medium inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                分享成品照
              </button>
            </div>
            <div className="flex-1 py-3">
              <button className="text-cherry-500 btn-cooking font-medium inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                記錄烹飪筆記
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 相關食譜
const RelatedRecipes = () => (
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">相關食譜</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* 由於實際相關食譜數據需要後端處理，這裡使用模擬數據展示UI */}
      {mockRecipes.slice(0, 3).map(relatedRecipe => (
        <Link 
          key={relatedRecipe.id} 
          to={`/recipe/${relatedRecipe.id}`}
          className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img src={relatedRecipe.imageUrl} alt={relatedRecipe.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-800">{relatedRecipe.title}</h3>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-cherry-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {relatedRecipe.communityStats?.likes ? `${4 + (relatedRecipe.communityStats.likes % 10) / 10}` : '4.5'}
              </span>
              <span className="mx-2">•</span>
              <span>{relatedRecipe.prepTime + relatedRecipe.cookTime} 分鐘</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// 主要元件
const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // 模擬API請求
    const fetchRecipe = () => {
      setLoading(true);
      
      setTimeout(() => {
        // 若有id則根據id查找，否則使用第一個模擬數據
        const foundRecipe = id 
          ? mockRecipes.find(recipe => recipe.id === id) 
          : mockRecipes[0];
        
        if (foundRecipe) {
          setRecipe(foundRecipe);
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchRecipe();
  }, [id]);
  
  // 加載中狀態
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cherry-500"></div>
        </div>
      </div>
    );
  }
  
  // 未找到食譜
  if (!recipe) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">食譜未找到</h2>
          <p className="text-gray-600 mb-6">抱歉，我們找不到您要查看的食譜。</p>
          <Link to="/recipe-recommend" className="px-6 py-3 bg-cherry-500 text-white rounded-full hover:bg-cherry-600 inline-block">
            回到食譜列表
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Breadcrumb recipe={recipe} />
      
      <RecipeHero recipe={recipe} />
      <RecipeStats recipe={recipe} />
      <IngredientsList recipe={recipe} />
      <CookingSteps recipe={recipe} />
      <CommunitySection recipe={recipe} />
      <RelatedRecipes />
      
      {/* 回到頂部按鈕 */}
      <div className="text-center mt-12">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          回到頂部
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailPage; 