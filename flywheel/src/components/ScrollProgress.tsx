import { motion, useScroll, useSpring } from 'framer-motion';

/** 顶部滚动进度条 —— 薄荷青 signature 色 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-1.5 w-full origin-left bg-mint"
    />
  );
}
