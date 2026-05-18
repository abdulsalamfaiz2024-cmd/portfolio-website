"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ── Fade-in on scroll observer ──────────────────────────────────────
// Wraps any element with a subtle upward fade triggered once on viewport entry.

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
