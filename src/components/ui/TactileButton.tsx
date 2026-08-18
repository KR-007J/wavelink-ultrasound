import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';

interface TactileButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.playClick();
    if (onClick) onClick(e);
  };

  if (variant === 'primary') {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden px-6 py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg group select-none ${className}`}
        style={{
          backgroundColor: THEME.accent,
          color: '#0E0E12',
          boxShadow: '0 0 25px -4px rgba(255, 107, 53, 0.55)',
        }}
        {...props}
      >
        {/* Subtle traveling light shimmer */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        <span className="relative z-10">{children}</span>
        {icon && <span className="relative z-10 transition-transform group-hover:translate-x-1 duration-200">{icon}</span>}
      </motion.button>
    );
  }

  if (variant === 'glass') {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-white/15 bg-white/[0.04] text-white hover:border-[#FF6B35]/50 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-all group select-none ${className}`}
        {...props}
      >
        <span>{children}</span>
        {icon && <span className="transition-transform group-hover:translate-x-1 duration-200">{icon}</span>}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer bg-white/10 text-white hover:bg-white/20 transition-all select-none ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </motion.button>
  );
};

export default TactileButton;
