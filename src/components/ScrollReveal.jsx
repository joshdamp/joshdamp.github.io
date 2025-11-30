import { useEffect, useRef, memo, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollReveal = memo(({
  children,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 10,
  y = 50,
  duration = 1,
  delay = 0,
  containerClassName = ''
}) => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Memoize styles to prevent recalculation
  const initialStyles = useMemo(() => ({
    opacity: baseOpacity,
    y,
    filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
  }), [baseOpacity, y, enableBlur, blurStrength]);

  const animatedStyles = useMemo(() => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration,
    delay,
    ease: 'power3.out'
  }), [duration, delay]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.set(el, initialStyles);

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => gsap.to(el, animatedStyles),
      onEnterBack: () => gsap.to(el, animatedStyles),
      onLeaveBack: () => gsap.to(el, {
        ...initialStyles,
        duration: duration * 0.5,
        ease: 'power3.in'
      })
    });

    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, [initialStyles, animatedStyles, duration]);

  return (
    <div ref={containerRef} className={`scroll-reveal-container ${containerClassName}`}>
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
