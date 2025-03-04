import React from 'react';
import clsx from 'clsx';

const Input = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  startIcon,
  endIcon,
  size = 'md', // 'sm', 'md', 'lg'
  ...props
}) => {
  // Define size-specific styles
  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2.5 px-4 text-base'
  };

  const inputClasses = clsx(
    'block rounded-md border-gray-300 shadow-sm',
    'focus:border-blue-500 focus:ring-blue-500',
    sizeStyles[size],
    {
      'w-full': fullWidth,
      'border-red-500 focus:border-red-500 focus:ring-red-500': error,
      'opacity-50 bg-gray-100 cursor-not-allowed': disabled,
      'pl-10': startIcon,
      'pr-10': endIcon
    },
    className
  );

  return (
    <div className={clsx('mb-4', { 'w-full': fullWidth })}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {startIcon}
          </div>
        )}
        
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && helperText && (
        <p className="mt-1 text-sm text-red-600">{helperText}</p>
      )}
      
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;