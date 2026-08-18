import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface TelemetryPanelProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  tiltOnHover?: boolean;
  heroTier?: boolean;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({
  children,
  className = '',
  tiltOnHover = false,
  heroTier = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={tiltOnHover ? { y: -3, scale: 1.004 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group telemetry-glass p-8 ${
        heroTier ? 'hero-glass rounded-3xl' : 'rounded-2xl'
      } ${className}`}
      {...props}
    >
      {/* 1px Animated Traveling Top Glow-Line (Solar Amber to Champagne Shimmer) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-[#FF6B35] transition-opacity duration-300 pointer-events-none" />

      {children}
    </motion.div>
  );
};

export default TelemetryPanel;
