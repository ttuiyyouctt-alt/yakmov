import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        shadow-2xl 
        rounded-2xl 
        p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
};