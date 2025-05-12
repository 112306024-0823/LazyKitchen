// src/types/index.ts - 專案中使用的型別定義

// 用戶設定
export interface UserProfile {
  id: string;
  name: string;
  preference: '葷' | '素';
  skillLevel: '快速' | '進階';
  appliances: string[]; // ['電鍋', '微波爐', '烤箱'] 等
  allergies: string[];
  favoriteIngredients: string[];
}

// 食材
export interface Ingredient {
  id: string;
  name: string;
  imageUrl?: string;
  category?: string; // 如：蔬菜、肉類、調味料等
}

// 食譜
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
  author: string;
  imageUrl: string;
  prepTime: number; // 準備時間（分鐘）
  cookTime: number; // 烹飪時間（分鐘）
  servings: number; // 份量（人數）
  difficulty: '簡單' | '中等' | '困難';
  isFavorite: boolean;
  communityStats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// 食譜中的食材（包含份量）
export interface RecipeIngredient {
  ingredient: Ingredient;
  amount: number;
  unit: string; // 如：克、湯匙、杯等
}

// 食譜步驟
export interface RecipeStep {
  id: string;
  order: number;
  description: string;
  imageUrl?: string;
  timer?: number; // 該步驟的計時（秒）
}

// 烹飪筆記
export interface CookingNote {
  id: string;
  recipeId: string;
  userId: string;
  content: string;
  createdAt: string;
  voiceUrl?: string;
}

// 上傳的照片
export interface UploadedPhoto {
  id: string;
  recipeId?: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  type: 'ingredient' | 'cooking-process' | 'final-dish';
}

// 社群評論
export interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  content: string;
  createdAt: string;
  likes: number;
}

// 烹飪技巧
export interface CookingTip {
  id: string;
  title: string;
  content: string;
  category: string; // 如：食材處理、烹飪方法、調味技巧、保存方法、時間管理
  imageUrl?: string;
  author: string;
  dateAdded: string;
  isFavorite: boolean;
  likes: number;
} 