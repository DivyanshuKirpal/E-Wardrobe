import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  error,
  required = false,
  disabled = false,
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-purple-200 
    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/25 
    transition-all duration-300 backdrop-blur-sm
    ${error ? 'border-red-400 focus:ring-red-400' : 'border-white/30'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-sm font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
