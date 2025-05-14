// src/config/api.ts
// API配置檔案

// 從Vite環境變量中獲取（Vite使用import.meta.env而不是process.env）
const API_KEY = import.meta.env.VITE_FOOD_API_KEY || 'YOUR_API_KEY_HERE';

// 食材辨識API設定
export const FOOD_RECOGNITION_API = {
  // 基本URL（請替換為實際API URL）
  BASE_URL: 'https://api.example.com',
  
  // 端點
  ENDPOINTS: {
    RECOGNIZE: '/food-recognition',
    FOOD_INFO: '/food-info',
  },
  
  // API密鑰
  KEY: API_KEY,
  
  // 請求選項
  OPTIONS: {
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  }
};

// 建議使用的食材辨識API服務商
export const RECOMMENDED_API_SERVICES = [
  {
    name: 'Google Cloud Vision API',
    website: 'https://cloud.google.com/vision',
    features: ['物體辨識', '標籤偵測', '圖像屬性'],
    freeQuota: '每月1000次請求免費'
  },
  {
    name: 'Microsoft Azure Computer Vision',
    website: 'https://azure.microsoft.com/zh-tw/services/cognitive-services/computer-vision/',
    features: ['食品辨識', '營養成分分析', '物體辨識'],
    freeQuota: '每月5000次交易免費'
  },
  {
    name: 'Amazon Rekognition',
    website: 'https://aws.amazon.com/rekognition/',
    features: ['物體和場景偵測', '圖像標記', '自訂標籤'],
    freeQuota: 'AWS Free Tier提供的額度'
  }
];

// 一般API錯誤處理
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    // 一般JavaScript錯誤
    return `錯誤: ${error.message}`;
  } else if (typeof error === 'string') {
    // 字符串錯誤
    return `錯誤: ${error}`;
  } else {
    // 其他未知類型的錯誤
    return '發生未知錯誤，請稍後再試。';
  }
}; 