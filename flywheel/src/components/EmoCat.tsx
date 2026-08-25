import { motion } from 'framer-motion';

type Expression = 'main' | 'think' | 'happy' | 'grin' | 'wow' | 'wink' | 'love';

interface EmoCatProps {
  expr?: Expression;
  className?: string;
  /** 轻微漂浮动效 */
  float?: boolean;
  alt?: string;
}

const FLOAT = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
};

/** 频道 IP：薄荷青眼黑猫 emo。无人设台的「脸」。 */
export function EmoCat({ expr = 'main', className, float = false, alt = 'emo 黑猫 IP' }: EmoCatProps) {
  const src = `${import.meta.env.BASE_URL}emo/emo-${expr}.png`;
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      style={{ userSelect: 'none' }}
      {...(float ? FLOAT : {})}
    />
  );
}
