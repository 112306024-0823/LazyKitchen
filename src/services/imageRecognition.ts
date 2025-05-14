// src/services/imageRecognition.ts
// 圖像識別相關服務

import { FOOD_RECOGNITION_API, handleApiError } from '../config/api';
import type { Ingredient } from '../types';

// 食材辨識的響應類型
interface FoodRecognitionResponse {
  success: boolean;
  ingredients: Array<{
    name: string;
    confidence: number;
    quantity?: string;
    unit?: string;
  }>;
  error?: string;
}

/**
 * 驗證圖像文件大小和格式
 * @param file 要驗證的圖像文件
 * @returns 驗證結果 {isValid: boolean, message?: string}
 */
export const validateImageFile = (file: File): { isValid: boolean; message?: string } => {
  // 檢查文件大小
  if (file.size > FOOD_RECOGNITION_API.OPTIONS.MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      message: `圖像大小不能超過 ${FOOD_RECOGNITION_API.OPTIONS.MAX_IMAGE_SIZE / (1024 * 1024)} MB`
    };
  }

  // 檢查文件格式
  if (!FOOD_RECOGNITION_API.OPTIONS.ACCEPTED_FORMATS.includes(file.type)) {
    return {
      isValid: false,
      message: `不支持的文件格式。請上傳 ${FOOD_RECOGNITION_API.OPTIONS.ACCEPTED_FORMATS.join(', ')} 格式的圖像`
    };
  }

  return { isValid: true };
};

/**
 * 將圖像文件發送到API進行食材辨識
 * @param imageFile 要辨識的圖像文件
 * @returns 辨識到的食材信息
 */
export const recognizeFoodFromImage = async (imageFile: File): Promise<FoodRecognitionResponse> => {
  try {
    const validation = validateImageFile(imageFile);
    if (!validation.isValid) {
      return {
        success: false,
        ingredients: [],
        error: validation.message
      };
    }

    // 準備FormData
    const formData = new FormData();
    formData.append('image', imageFile);

    // 發送API請求
    const response = await fetch(
      `${FOOD_RECOGNITION_API.BASE_URL}${FOOD_RECOGNITION_API.ENDPOINTS.RECOGNIZE}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${FOOD_RECOGNITION_API.KEY}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `服務器錯誤: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      ingredients: data.ingredients || []
    };
  } catch (error) {
    console.error('食材辨識失敗:', error);
    return {
      success: false,
      ingredients: [],
      error: handleApiError(error)
    };
  }
};

/**
 * 根據API返回的食材匹配本地食材數據
 * @param recognizedItems API返回的食材項目
 * @param availableIngredients 本地可用的食材數據
 * @returns 匹配的食材ID數組
 */
export const mapRecognizedIngredientsToLocal = (
  recognizedItems: FoodRecognitionResponse['ingredients'],
  availableIngredients: Ingredient[]
): string[] => {
  const matchedIngredientIds: string[] = [];

  recognizedItems.forEach(item => {
    // 只考慮置信度較高的食材（閾值可調整）
    if (item.confidence < 0.6) return;

    // 查找最佳匹配
    const matchedIngredient = availableIngredients.find(
      ing => ing.name.toLowerCase().includes(item.name.toLowerCase()) ||
            (ing.category && item.name.toLowerCase().includes(ing.category.toLowerCase()))
    );

    if (matchedIngredient) {
      matchedIngredientIds.push(matchedIngredient.id);
    }
  });

  return matchedIngredientIds;
};

/**
 * 模擬圖像辨識（開發/測試用）
 * 當實際API不可用時使用
 * @param availableIngredients 可用的食材列表
 * @returns 模擬的辨識結果
 */
export const simulateFoodRecognition = (availableIngredients: Ingredient[]): Promise<FoodRecognitionResponse> => {
  return new Promise(resolve => {
    // 隨機選擇2-4個食材
    const count = Math.floor(Math.random() * 3) + 2;
    const recognizedIngredients: Array<{
      name: string;
      confidence: number;
      quantity?: string;
      unit?: string;
    }> = [];

    // 打亂食材列表並選取前N個
    const shuffledIngredients = [...availableIngredients].sort(() => 0.5 - Math.random());

    for (let i = 0; i < Math.min(count, shuffledIngredients.length); i++) {
      const ingredient = shuffledIngredients[i];
      recognizedIngredients.push({
        name: ingredient.name,
        confidence: Math.random() * 0.3 + 0.7, // 0.7到1.0之間的隨機信心值
        quantity: `${Math.floor(Math.random() * 5) + 1}00`, // 100-500g
        unit: 'g'
      });
    }

    // 模擬API延遲
    setTimeout(() => {
      resolve({
        success: true,
        ingredients: recognizedIngredients
      });
    }, 1500);
  });
}; 