import React, { useState } from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  interactive = true,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (e) => {
    if (interactive) {
      createRipple(e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-pink-500/50 animate-gradient-shift',
    secondary: 'bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-md',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-red-500/50',
    ghost: 'bg-transparent text-white hover:bg-white/10 backdrop-blur-sm',
    rainbow: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white animate-rainbow hover:animate-pulse-glow',
    neon: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black neon-glow',
    liquid: 'liquid-morph text-white hover:scale-105',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl',
  };
  
  const interactiveClasses = interactive ? 'interactive-button hover:scale-105 transform active:scale-95' : '';
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : interactiveClasses;
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease'
      }}
      {...props}
    >
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/30 animate-sparkle"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: 'sparkle 0.6s ease-out'
          }}
        />
      ))}
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full hover:translate-x-full" />
      
      {/* Content */}
      <span className="relative z-10">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default Button;
