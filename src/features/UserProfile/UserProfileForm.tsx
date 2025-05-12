import React, { useState } from 'react';
import type { UserProfile } from '../../types';
import { mockUserProfile } from '../../mocks/data';
import { Card } from '../../components';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialData?: UserProfile;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ 
  onSubmit,
  initialData = mockUserProfile 
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
    setShowSuccessMessage(true);
    
    // 3秒後隱藏成功訊息
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // 處理文本輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理選擇變更
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 處理多選複選框
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const { name, checked } = e.target;
    
    setProfile(prev => {
      const currentItems = prev[name as keyof UserProfile] as string[];
      
      if (checked) {
        // 添加項目到陣列
        return {
          ...prev,
          [name]: [...currentItems, item]
        };
      } else {
        // 從陣列中移除項目
        return {
          ...prev,
          [name]: currentItems.filter(i => i !== item)
        };
      }
    });
  };

  // 預設可選的廚具
  const availableAppliances = [
    '電鍋', '微波爐', '烤箱', '平底鍋', '電子鍋', '氣炸鍋',
    '壓力鍋', '電磁爐', '慢燉鍋', '攪拌機'
  ];

  return (
    <Card className="overflow-hidden">
      <h2 className="text-xl font-semibold px-8 py-6 bg-gray-50 border-b border-gray-100">個人設定</h2>
      
      {showSuccessMessage && (
        <div className="mx-8 mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p>設定已儲存成功！</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">姓名</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">飲食偏好</label>
            <select
              name="preference"
              value={profile.preference}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="葷">葷食</option>
              <option value="素">素食</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">烹飪技能</label>
            <select
              name="skillLevel"
              value={profile.skillLevel}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="快速">新手/快速料理</option>
              <option value="進階">進階/複雜料理</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">過敏源（請用逗號分隔）</label>
            <input
              type="text"
              name="allergies"
              value={profile.allergies.join(',')}
              onChange={(e) => {
                const allergies = e.target.value ? e.target.value.split(',').map(i => i.trim()) : [];
                setProfile(prev => ({ ...prev, allergies }));
              }}
              placeholder="例：花生,海鮮,牛奶"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">喜愛的食材（請用逗號分隔）</label>
            <input
              type="text"
              name="favoriteIngredients"
              value={profile.favoriteIngredients.join(',')}
              onChange={(e) => {
                const favoriteIngredients = e.target.value ? e.target.value.split(',').map(i => i.trim()) : [];
                setProfile(prev => ({ ...prev, favoriteIngredients }));
              }}
              placeholder="例：雞肉,番茄,蛋"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mb-6 mt-8">
          <label className="block text-gray-700 mb-4 font-medium">家中廚具</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {availableAppliances.map(item => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  id={`appliance-${item}`}
                  name="appliances"
                  checked={profile.appliances.includes(item)}
                  onChange={(e) => handleCheckboxChange(e, item)}
                  className="w-5 h-5 text-cherry-500 border-gray-300 rounded focus:ring-cherry-400"
                />
                <label htmlFor={`appliance-${item}`} className="ml-3 text-gray-700">{item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-3 bg-cherry-500 text-white rounded-lg shadow hover:bg-cherry-600 focus:outline-none focus:ring-2 focus:ring-cherry-500 focus:ring-offset-2 transition-all"
          >
            儲存設定
          </button>
        </div>
      </form>
    </Card>
  );
};

export default UserProfileForm; 