
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', ariaLabel, disabled = false }) => {
  const baseClasses = "font-semibold text-white rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9c1a1e]";
  const interactiveClasses = "transform hover:scale-105 active:scale-95";
  const disabledClasses = "opacity-60 cursor-not-allowed";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${disabled ? disabledClasses : interactiveClasses} ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;