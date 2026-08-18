import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { THEME } from '../../lib/theme';

export const CursorGlow: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const mouseX = useSpring(0, { damping: 25, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-20"
      style={{
        left: mouseX,
        top: mouseY,
        backgroundColor: THEME.accent,
      }}
    />
  );
};

export default CursorGlow;
