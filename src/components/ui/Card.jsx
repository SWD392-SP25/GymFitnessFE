import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  header,
  noPadding = false,
  bordered = true,
  shadow = 'md', // 'none', 'sm', 'md', 'lg', 'xl'
  ...props
}) => {
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg'
  };

  return (
    <div 
      className={clsx(
        'bg-white rounded-lg overflow-hidden', 
        bordered && 'border border-gray-200',
        shadowStyles[shadow],
        className
      )}
      {...props}
    >
      {/* Card Header */}
      {(header || title) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {header || (
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      
      {/* Card Body */}
      <div className={clsx(!noPadding && 'p-6')}>
        {children}
      </div>
      
      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;