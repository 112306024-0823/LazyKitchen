import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  elevated?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  elevated = false,
  className = '',
  disabled,
  ...props
}) => {
  // 基本樣式
  const baseStyles = 'font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
  
  // 圓角樣式
  const roundedStyles = {
    'none': 'rounded-none',
    'sm': 'rounded',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full',
  };
  
  // 尺寸樣式
  const sizeStyles = {
    'xs': 'px-2.5 py-1 text-xs',
    'sm': 'px-3 py-1.5 text-sm',
    'md': 'px-6 py-2.5 text-base',
    'lg': 'px-8 py-3.5 text-lg',
    'xl': 'px-10 py-4 text-xl',
  };
  
  // 變體樣式
  const variantStyles = {
    primary: 'bg-cherry-500 hover:bg-cherry-600 active:bg-cherry-700 text-white focus:ring-cherry-500 shadow-sm hover:shadow',
    secondary: 'bg-sunflower-300 hover:bg-sunflower-400 active:bg-sunflower-500 text-gray-800 focus:ring-sunflower-300 shadow-sm hover:shadow',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300',
    text: 'text-cherry-500 hover:text-cherry-600 hover:bg-cherry-50 active:bg-cherry-100 focus:ring-cherry-500',
    danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow',
    success: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow',
  };
  
  // 禁用樣式
  const disabledStyles = disabled || isLoading
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';
  
  // 寬度樣式
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // 陰影樣式
  const elevationStyles = elevated ? 'shadow-md hover:shadow-lg active:shadow' : '';
  
  // 組合所有樣式
  const buttonStyles = `
    ${baseStyles}
    ${roundedStyles[rounded]}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${disabledStyles}
    ${widthStyles}
    ${elevationStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          
          {children}
          
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button; 