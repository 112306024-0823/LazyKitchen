// src/services/chatbotService.ts
// 聊天機器人服務

import type { Recipe } from '../types/index';

export interface ChatbotResponse {
  text: string;
  recipeId?: string;
  recipeTitle?: string;
}

/**
 * 根據用戶輸入生成機器人響應
 * @param userInput 用戶輸入文字
 * @param recipes 可用的食譜列表
 * @returns 機器人響應
 */
export const generateResponse = (userInput: string, recipes: Recipe[]): ChatbotResponse => {
  const input = userInput.toLowerCase();
  
  // 問候
  if (input.includes('你好') || input.includes('嗨') || input.includes('哈囉')) {
    return {
      text: '你好！我是你的食譜助手。有什麼可以幫到你的嗎？我可以推薦食譜、解釋烹飪步驟或提供食材替代建議。'
    };
  }
  
  // 推薦食譜
  if (input.includes('推薦') || input.includes('建議') || input.includes('什麼好吃')) {
    if (recipes.length === 0) {
      return {
        text: '抱歉，目前沒有可用的食譜推薦。'
      };
    }
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    return {
      text: `我推薦你試試「${randomRecipe.title}」，${randomRecipe.description || '這是一道美味的料理'}`,
      recipeId: randomRecipe.id,
      recipeTitle: randomRecipe.title
    };
  }
  
  // 簡單料理
  if (input.includes('簡單') || input.includes('容易') || input.includes('快速')) {
    const easyRecipes = recipes.filter(r => r.difficulty === '簡單' || r.tags.some(tag => 
      tag.includes('簡易') || tag.includes('快速')
    ));
    
    if (easyRecipes.length > 0) {
      const randomEasy = easyRecipes[Math.floor(Math.random() * easyRecipes.length)];
      return {
        text: `「${randomEasy.title}」是一道很容易製作的料理，適合新手嘗試。只需要${randomEasy.prepTime + randomEasy.cookTime}分鐘就能完成！`,
        recipeId: randomEasy.id,
        recipeTitle: randomEasy.title
      };
    } else {
      return {
        text: '我找不到特別簡單的食譜，但你可以瀏覽所有食譜並按照烹飪時間排序找到快速料理。'
      };
    }
  }
  
  // 食材相關
  if (input.includes('食材') || input.includes('材料')) {
    if (input.includes('替代') || input.includes('換')) {
      return {
        text: '食材替代是很常見的需求。一般來說，肉類可以相互替代，蔬菜可以用季節性蔬菜替換。調味料則要考慮風味相似性。有特定食材想替換嗎？'
      };
    }
    
    return {
      text: '食材是料理的靈魂！你可以在食材輸入頁面選擇你家中有的食材，我會根據這些推薦適合的食譜。'
    };
  }
  
  // 烹飪問題
  if (input.includes('怎麼做') || input.includes('如何')) {
    return {
      text: '每個食譜都有詳細的步驟說明。點擊食譜卡片後可以查看完整的烹飪過程。你想了解哪道料理的做法呢？'
    };
  }
  
  // 感謝
  if (input.includes('謝謝') || input.includes('感謝')) {
    return {
      text: '不客氣！很高興能幫到你。如果還有其他問題，隨時都可以問我。祝你烹飪愉快！'
    };
  }
  
  // 默認回應
  return {
    text: '我可以幫你推薦食譜、解釋烹飪步驟或提供食材替代建議。請告訴我你想了解什麼？'
  };
}; 