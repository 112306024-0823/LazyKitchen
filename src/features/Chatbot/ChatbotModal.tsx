import React, { useState, useRef, useEffect } from 'react';
import { recognizeSpeech, stopRecognition } from '../../services/speechRecognition';
import { speakText, stopSpeaking } from '../../services/textToSpeech';
import { generateResponse } from '../../services/chatbotService';
import type { Recipe } from '../../types';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ 
  isOpen, 
  onClose, 
  recipes, 
  onSelectRecipe 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 初始歡迎訊息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: '你好！我是你的食譜助手。有什麼可以幫到你嗎？我可以推薦食譜、解釋烹飪步驟或提供食材替代建議。',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      
      // 朗讀歡迎訊息
      speakText('你好！我是你的食譜助手。有什麼可以幫到你嗎？');
    }
    
    // 清理
    return () => {
      stopSpeaking();
      stopRecognition();
    };
  }, [isOpen]);
  
  // 自動滾動到最新訊息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // 處理語音辨識
  const toggleSpeechRecognition = () => {
    if (isListening) {
      stopRecognition();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognizeSpeech({
        onResult: (text) => {
          setInputText(text);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };
  
  // 處理發送訊息
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // 處理用戶查詢並生成回應
    setTimeout(() => {
      const botResponse = generateResponse(userMessage.text, recipes);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // 朗讀回應
      speakText(botResponse.text);
      
      // 如果有推薦食譜
      if (botResponse.recipeId) {
        const viewRecipeMessage: Message = {
          id: `action-${Date.now()}`,
          text: `查看食譜：${botResponse.recipeTitle}`,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, viewRecipeMessage]);
      }
    }, 600);
  };
  
  // 處理查看食譜
  const handleViewRecipe = (recipeId: string) => {
    onSelectRecipe(recipeId);
    onClose();
  };
  
  // 按Enter鍵發送訊息
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* 聊天頭部 */}
        <div className="px-4 py-3 bg-tangerine-500 text-white flex justify-between items-center">
          <h3 className="font-medium">食譜助手</h3>
          <button 
            onClick={() => {
              stopSpeaking();
              onClose();
            }} 
            className="text-white hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 聊天訊息區 */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`px-4 py-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-tangerine-500 text-white rounded-tr-none' 
                    : message.text.startsWith('查看食譜')
                      ? 'bg-tangerine-100 text-tangerine-700 cursor-pointer hover:bg-tangerine-200'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
                onClick={() => {
                  // 如果是查看食譜的訊息，則導航到該食譜
                  if (message.text.startsWith('查看食譜')) {
                    const recipeId = message.text.split('：')[1];
                    const recipe = recipes.find(r => r.title === recipeId);
                    if (recipe) {
                      handleViewRecipe(recipe.id);
                    }
                  }
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* 輸入區 */}
        <div className="p-3 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="輸入訊息或點擊麥克風進行語音輸入..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine-400"
          />
          
          <button 
            onClick={toggleSpeechRecognition}
            className={`ml-2 p-2 rounded-full ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          <button 
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-tangerine-500 text-white rounded-full hover:bg-tangerine-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal; 