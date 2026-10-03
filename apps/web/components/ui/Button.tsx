import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className = '', children, ...props },
    ref
  ) => {
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.3JMo07kXVy/ours
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const variantClasses = {
      primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
=======
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-accent-500 text-white hover:bg-accent-600 hover:shadow-orange focus:ring-accent-400 active:scale-95',
      secondary:
        'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-soft focus:ring-primary-400 active:scale-95',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-400 active:scale-95',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-xl',
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.3JMo07kXVy/theirs
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

