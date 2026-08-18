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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    const handleScroll = (e: any) => {
      ScrollTrigger.update();

      if (e && typeof e.progress === 'number') {
        setScrollProgress(Math.max(0, Math.min(1, e.progress)));
      } else {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          const p = window.scrollY / scrollHeight;
          setScrollProgress(Math.max(0, Math.min(1, p)));
        }
      }

      setScrollVelocity(e?.velocity || 0);
    };

    lenis.on('scroll', handleScroll);

    // Window scroll fallback for mobile touch devices
    const onWindowScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = window.scrollY / scrollHeight;
        setScrollProgress(Math.max(0, Math.min(1, p)));
      }
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [setScrollProgress, setScrollVelocity]);

  return <>{children}</>;
};

export default LenisProvider;
