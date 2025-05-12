// src/mocks/data.ts - 模擬資料用於開發與Demo階段
import type { UserProfile, Ingredient, Recipe, RecipeIngredient, RecipeStep, Comment, CookingTip } from '../types';

// 模擬用戶設定
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: '王小明',
  preference: '葷',
  skillLevel: '快速',
  appliances: ['電鍋', '微波爐', '平底鍋', '氣炸鍋'],
  allergies: ['海鮮', '花生'],
  favoriteIngredients: ['雞肉', '蔬菜', '蛋']
};

// 模擬食材列表
export const mockIngredients: Ingredient[] = [
  {
    id: 'ing-1',
    name: '雞胸肉',
    category: '肉類',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-2',
    name: '洋蔥',
    category: '蔬菜',
    imageUrl: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-3',
    name: '紅椒',
    category: '蔬菜',
    imageUrl: 'https://images.unsplash.com/photo-1583119021934-cc712b0abb33?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-4',
    name: '雞蛋',
    category: '蛋/奶類',
    imageUrl: 'https://images.unsplash.com/photo-1598965402089-897c69f5bf59?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-5',
    name: '米飯',
    category: '主食',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-6',
    name: '蒜頭',
    category: '調味料',
    imageUrl: 'https://images.unsplash.com/photo-1615477550927-6ec8445a2159?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-7',
    name: '醬油',
    category: '調味料',
    imageUrl: 'https://images.unsplash.com/photo-1613920248829-55ab03596db4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'ing-8',
    name: '番茄',
    category: '蔬菜',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }
];

// 模擬食譜
export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: '簡易照燒雞肉蓋飯',
    description: '簡單快速的日式照燒雞肉飯，在家也能輕鬆做出餐廳等級的美味！',
    ingredients: [
      {
        ingredient: mockIngredients[0], // 雞胸肉
        amount: 200,
        unit: '克'
      },
      {
        ingredient: mockIngredients[1], // 洋蔥
        amount: 1/2,
        unit: '顆'
      },
      {
        ingredient: mockIngredients[5], // 蒜頭
        amount: 2,
        unit: '瓣'
      },
      {
        ingredient: mockIngredients[6], // 醬油
        amount: 2,
        unit: '湯匙'
      },
      {
        ingredient: {
          id: 'ing-9',
          name: '味醂',
          category: '調味料'
        },
        amount: 1,
        unit: '湯匙'
      },
      {
        ingredient: {
          id: 'ing-10',
          name: '糖',
          category: '調味料'
        },
        amount: 1,
        unit: '茶匙'
      },
      {
        ingredient: mockIngredients[4], // 米飯
        amount: 1,
        unit: '碗'
      }
    ],
    steps: [
      {
        id: 'step-1-1',
        order: 1,
        description: '將雞胸肉切成小塊，洋蔥切絲，蒜頭切末',
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-1-2',
        order: 2,
        description: '熱鍋加入一點油，放入蒜末爆香',
        imageUrl: 'https://images.unsplash.com/photo-1625937329935-287441889bce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-1-3',
        order: 3,
        description: '加入雞肉翻炒至表面變白',
        imageUrl: 'https://images.unsplash.com/photo-1588165171080-c89acfa5a58d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-1-4',
        order: 4,
        description: '加入洋蔥絲繼續翻炒至軟化',
        timer: 120
      },
      {
        id: 'step-1-5',
        order: 5,
        description: '加入醬油、味醂和糖，轉小火煮至醬汁濃稠',
        timer: 180
      },
      {
        id: 'step-1-6',
        order: 6,
        description: '將雞肉淋在米飯上，撒上蔥花即可享用',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      }
    ],
    tags: ['日式', '雞肉', '蓋飯', '晚餐', '簡易'],
    author: '懶人食代團隊',
    imageUrl: 'https://images.unsplash.com/photo-1567606647959-5516d48a8375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: '簡單',
    isFavorite: true,
    communityStats: {
      likes: 342,
      comments: 48,
      shares: 56
    }
  },
  {
    id: 'recipe-2',
    title: '番茄炒蛋',
    description: '經典家常料理，酸甜可口的番茄搭配鮮嫩的炒蛋，簡單又美味。',
    ingredients: [
      {
        ingredient: mockIngredients[3], // 雞蛋
        amount: 3,
        unit: '顆'
      },
      {
        ingredient: mockIngredients[7], // 番茄
        amount: 2,
        unit: '顆'
      },
      {
        ingredient: {
          id: 'ing-11',
          name: '蔥',
          category: '蔬菜'
        },
        amount: 1,
        unit: '根'
      },
      {
        ingredient: {
          id: 'ing-12',
          name: '鹽',
          category: '調味料'
        },
        amount: 1/4,
        unit: '茶匙'
      },
      {
        ingredient: {
          id: 'ing-13',
          name: '糖',
          category: '調味料'
        },
        amount: 1/2,
        unit: '茶匙'
      }
    ],
    steps: [
      {
        id: 'step-2-1',
        order: 1,
        description: '雞蛋打散加入少許鹽拌勻',
        imageUrl: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-2-2',
        order: 2,
        description: '番茄切塊，蔥切段',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-2-3',
        order: 3,
        description: '熱鍋倒油，倒入蛋液炒至半熟盛出',
        timer: 60
      },
      {
        id: 'step-2-4',
        order: 4,
        description: '原鍋加少許油，爆香蔥段',
        imageUrl: 'https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-2-5',
        order: 5,
        description: '加入番茄塊翻炒至軟化出汁',
        timer: 120
      },
      {
        id: 'step-2-6',
        order: 6,
        description: '加入少許鹽和糖調味',
        imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-2-7',
        order: 7,
        description: '倒入炒好的蛋翻炒均勻即可出鍋',
        imageUrl: 'https://images.unsplash.com/photo-1621237023000-6a628c285938?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      }
    ],
    tags: ['中式', '家常菜', '快手菜', '素食', '早餐'],
    author: '懶人食代團隊',
    imageUrl: 'https://images.unsplash.com/photo-1635516636894-a689632df17d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: '簡單',
    isFavorite: false,
    communityStats: {
      likes: 289,
      comments: 32,
      shares: 41
    }
  },
  {
    id: 'recipe-3',
    title: '彩椒雞肉炒飯',
    description: '色彩繽紛的炒飯，加入彩椒和雞肉增添風味和營養，是一道完整的主食。',
    ingredients: [
      {
        ingredient: mockIngredients[4], // 米飯
        amount: 2,
        unit: '碗'
      },
      {
        ingredient: mockIngredients[0], // 雞胸肉
        amount: 100,
        unit: '克'
      },
      {
        ingredient: mockIngredients[2], // 紅椒
        amount: 1/2,
        unit: '顆'
      },
      {
        ingredient: {
          id: 'ing-14',
          name: '黃椒',
          category: '蔬菜'
        },
        amount: 1/2,
        unit: '顆'
      },
      {
        ingredient: mockIngredients[3], // 雞蛋
        amount: 2,
        unit: '顆'
      },
      {
        ingredient: mockIngredients[1], // 洋蔥
        amount: 1/4,
        unit: '顆'
      },
      {
        ingredient: mockIngredients[6], // 醬油
        amount: 1,
        unit: '湯匙'
      }
    ],
    steps: [
      {
        id: 'step-3-1',
        order: 1,
        description: '將雞胸肉切小丁，彩椒和洋蔥切小塊',
        imageUrl: 'https://images.unsplash.com/photo-1600626333540-9d501648685f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-3-2',
        order: 2,
        description: '熱鍋倒油，打入雞蛋炒散',
        imageUrl: 'https://images.unsplash.com/photo-1564914138610-905a0291c097?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-3-3',
        order: 3,
        description: '加入雞肉丁翻炒至變色',
        timer: 90
      },
      {
        id: 'step-3-4',
        order: 4,
        description: '加入彩椒和洋蔥繼續翻炒',
        imageUrl: 'https://images.unsplash.com/photo-1551464664-222eeb2d2034?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-3-5',
        order: 5,
        description: '倒入隔夜冷飯，用鏟子拍散',
        imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'step-3-6',
        order: 6,
        description: '最後加入醬油調味，大火翻炒均勻即可',
        imageUrl: 'https://images.unsplash.com/photo-1617016698293-eb51de04a4ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
      }
    ],
    tags: ['炒飯', '雞肉', '家常菜', '午餐', '快手菜'],
    author: '懶人食代團隊',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: '簡單',
    isFavorite: false,
    communityStats: {
      likes: 217,
      comments: 26,
      shares: 18
    }
  }
];

// 模擬評論
export const mockComments: Comment[] = [
  {
    id: 'c1',
    recipeId: '1',
    userId: 'u1',
    userName: '美食家',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=1',
    content: '我加了一點糖，味道更好了！推薦大家試試。',
    createdAt: '2023-11-12T15:32:00Z',
    likes: 5,
  },
  {
    id: 'c2',
    recipeId: '1',
    userId: 'u2',
    userName: '小新手',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=2',
    content: '第一次做就成功了，步驟很清晰，謝謝分享！',
    createdAt: '2023-11-13T09:15:00Z',
    likes: 3,
  },
  {
    id: 'c3',
    recipeId: '2',
    userId: 'u3',
    userName: '健身達人',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=3',
    content: '每天午餐必備，搭配糙米更健康。',
    createdAt: '2023-11-10T12:43:00Z',
    likes: 7,
  },
];

// 模擬烹飪技巧
export const mockCookingTips: CookingTip[] = [
  {
    id: 'tip-1',
    title: '蒜頭快速去皮技巧',
    content: '將蒜頭放入一個密封的容器中用力搖晃約30秒，蒜皮就會輕鬆脫落，省去一個個剝皮的麻煩。',
    category: '食材處理',
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '料理達人',
    dateAdded: '2023-11-05',
    isFavorite: false,
    likes: 158
  },
  {
    id: 'tip-2',
    title: '不溢出的煮麵方法',
    content: '在煮麵的水中加入一小匙食用油，可以防止水溢出，同時避免麵條黏在一起。',
    category: '烹飪方法',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '家常美食',
    dateAdded: '2023-11-10',
    isFavorite: true,
    likes: 236
  },
  {
    id: 'tip-3',
    title: '肉類醃製黃金時間',
    content: '肉類醃製時間不宜過長，雞肉約30分鐘至2小時，牛肉和豬肉約2至4小時為佳，避免肉質變柴。',
    category: '調味技巧',
    imageUrl: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '肉食控',
    dateAdded: '2023-11-08',
    isFavorite: false,
    likes: 197
  },
  {
    id: 'tip-4',
    title: '蔬菜保鮮小秘訣',
    content: '將蔬菜用廚房紙巾包裹後再放入保鮮袋中，可以吸收多餘水分並保持蔬菜新鮮。',
    category: '保存方法',
    imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '健康飲食家',
    dateAdded: '2023-11-15',
    isFavorite: false,
    likes: 172
  },
  {
    id: 'tip-5',
    title: '烘焙準備的時間管理',
    content: '烘焙前一天晚上準備好所有食材和工具，並閱讀完整食譜，能讓烘焙過程更加順暢並減少出錯。',
    category: '時間管理',
    imageUrl: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '甜點師',
    dateAdded: '2023-11-03',
    isFavorite: true,
    likes: 215
  },
  {
    id: 'tip-6',
    title: '快速軟化奶油的方法',
    content: '需要軟化奶油時，將奶油切成小塊並放在室溫下約15分鐘，比整塊放置更快軟化。',
    category: '食材處理',
    imageUrl: 'https://images.unsplash.com/photo-1569288063643-5d9869a81c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: '烘焙王',
    dateAdded: '2023-11-12',
    isFavorite: false,
    likes: 143
  }
]; 