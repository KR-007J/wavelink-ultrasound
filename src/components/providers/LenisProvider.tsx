import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWavelinkStore } from '../../store/useWavelinkStore';

gsap.registerPlugin(ScrollTrigger);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setScrollProgress = useWavelinkStore((s) => s.setScrollProgress);
  const setScrollVelocity = useWavelinkStore((s) => s.setScrollVelocity);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = window.scrollY / scrollHeight;
        setScrollProgress(progress);
      }

      setScrollVelocity(e.velocity || 0);
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [setScrollProgress, setScrollVelocity]);

  return <>{children}</>;
};

export default LenisProvider;
