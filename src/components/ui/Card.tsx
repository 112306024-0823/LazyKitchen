import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  elevated?: boolean;
  bordered?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  elevated = false,
  bordered = false,
  rounded = 'lg',
}) => {
  // 基本樣式
  const baseStyles = 'bg-white overflow-hidden transition-all duration-200';
  
  // 圓角樣式
  const roundedStyles = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
  };
  
  // 陰影樣式
  const shadowStyles = elevated
    ? 'shadow-md'
    : 'shadow-sm';
  
  // 邊框樣式
  const borderStyles = bordered
    ? 'border border-gray-200'
    : '';
  
  // 懸停效果
  const hoverStyles = hoverEffect
    ? onClick 
      ? 'hover:shadow-lg cursor-pointer transform hover:-translate-y-1'
      : 'hover:shadow-lg'
    : '';
  
  // 組合所有樣式
  const cardStyles = `
    ${baseStyles}
    ${roundedStyles[rounded]}
    ${shadowStyles}
    ${borderStyles}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

// 卡片標題元件
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = ''
}) => (
  <div className={`font-semibold text-lg px-6 pt-6 text-gray-800 ${className}`}>
    {children}
  </div>
);

// 卡片內容元件
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className = '',
  noPadding = false
}) => (
  <div className={`${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

// 卡片頁腳元件
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = ''
}) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

// 卡片圖片元件
interface CardImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt = '', 
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover"
    />
  </div>
);

export default Card; 