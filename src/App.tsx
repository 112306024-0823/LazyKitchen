import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'

// 引入功能模組
import UserProfilePage from './features/UserProfile'
import IngredientInputPage from './features/IngredientInput'
import RecipeRecommendPage from './features/RecipeRecommend'
import RecipeDetailPage from './features/RecipeDetail'
import CookingTipsPage from './features/CookingTips'

// 導航連結屬性類型
interface NavItemProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

// 導航連結
const NavItem = ({ to, children, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  )
}

// 側邊導覽列元件
const SideDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // 點擊外部關閉抽屜
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  return (
    <>
      <div className={`side-drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div ref={drawerRef} className={`side-drawer ${isOpen ? 'open' : ''} bg-white`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group" onClick={onClose}>
              <svg className="w-8 h-8 text-tangerine-500 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12L11 9V15L15 12Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold text-gray-800 font-display">懶人食代</h1>
                <span className="text-xs tracking-widest font-medium text-tangerine-500 -mt-1 font-logo transition-all group-hover:tracking-wider">LAZY KITCHEN</span>
              </div>
            </Link>
            <button 
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-tangerine-200"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            <NavItem to="/" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>首頁</span>
              </div>
            </NavItem>
            
            <NavItem to="/user-profile" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>個人設定</span>
              </div>
            </NavItem>
            
            <NavItem to="/ingredient-input" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>食材輸入</span>
              </div>
            </NavItem>
            
            <NavItem to="/recipe-recommend" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>食譜推薦</span>
              </div>
            </NavItem>
            
            <NavItem to="/cooking-tips" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>烹飪技巧</span>
              </div>
            </NavItem>
            
            <NavItem to="/recipe-detail" onClick={onClose}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>烹飪助手</span>
              </div>
            </NavItem>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-4 text-center">
            &copy; {new Date().getFullYear()} 懶人食代
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-tangerine-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-tangerine-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-tangerine-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// 應用頭部導航
const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <header className="bg-tangerine-500 text-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <svg className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12L11 9V15L15 12Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold font-display">懶人食代</h1>
              <span className="text-xs tracking-widest font-medium -mt-1 opacity-90 font-logo transition-all duration-300 group-hover:tracking-wider">LAZY KITCHEN</span>
            </div>
          </Link>
          
          {/* 桌面版導航 */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              {[
                { path: '/', icon: 'M3 9.5L12 4L21 9.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V9.5Z M9 21.5V13.5H15V21.5', label: '首頁' },
                { path: '/user-profile', icon: 'M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z', label: '個人設定' },
                { path: '/ingredient-input', icon: 'M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z M4 17.5C4 16.1193 5.11929 15 6.5 15H13.5C14.8807 15 16 16.1193 16 17.5V21H4V17.5Z M16 20C16 18.3431 17.3431 17 19 17C20.6569 17 22 18.3431 22 20V21H16V20Z', label: '食材輸入' },
                { path: '/recipe-recommend', icon: 'M11 3H4C3.44772 3 3 3.44772 3 4V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V11 M17.5 3.5V8.5L19.5 6.5L21.5 8.5V3.5H17.5Z M7 7H10 M7 11H14 M7 15H12', label: '食譜推薦' },
                { path: '/cooking-tips', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', label: '烹飪技巧' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-white text-tangerine-600 shadow-sm' 
                        : 'hover:bg-tangerine-600/80 hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* 漢堡選單按鈕 */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-tangerine-600 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 側邊抽屜導航 */}
      <SideDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

// 應用頁腳
const AppFooter = () => (
  <footer className="bg-gray-50 py-8 border-t border-gray-200 hidden md:block">
    <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-medium text-tangerine-600 mb-3">懶人食代</h3>
          <p className="text-gray-600 text-sm">
            讓每個人都能輕鬆做出美味料理，不再為晚餐煩惱。
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-tangerine-600 mb-3">功能</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><Link to="/user-profile" className="hover:text-tangerine-500">個人設定</Link></li>
            <li><Link to="/ingredient-input" className="hover:text-tangerine-500">食材輸入</Link></li>
            <li><Link to="/recipe-recommend" className="hover:text-tangerine-500">食譜推薦</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-tangerine-600 mb-3">聯絡我們</h3>
          <p className="text-sm text-gray-600">
            有任何問題或建議嗎？歡迎與我們聯繫。
          </p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-tangerine-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-tangerine-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-tangerine-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"></path></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 懶人食代 - Lazy Kitchen All rights reserved.
      </div>
    </div>
  </footer>
)

// 添加安裝按鈕
const AppInstallButton = () => {
  // 直接返回null，不顯示安裝按鈕
  return null;
};

// 主要應用元件
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />
        
        <main className="flex-1 w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/user-profile" replace />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/ingredient-input" element={<IngredientInputPage />} />
            <Route path="/recipe-recommend" element={<RecipeRecommendPage />} />
            <Route path="/recipe-detail" element={<RecipeDetailPage />} />
            <Route path="/recipe-detail/:id" element={<RecipeDetailPage />} />
            <Route path="/cooking-tips" element={<CookingTipsPage />} />
            {/* 未來這裡會添加更多路由 */}
          </Routes>
        </main>
        
        <AppFooter />
        
        {/* 語音助手 */}
        <button className="voice-assistant hidden md:flex group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-tangerine-500 transition-all duration-300 hover:scale-110"
                aria-label="語音助手">
          <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
    </Router>
  )
}

export default App
