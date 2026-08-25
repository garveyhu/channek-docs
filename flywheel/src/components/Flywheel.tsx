import { motion } from 'framer-motion';
import { FLYWHEEL } from '@/data/workflow';

interface FlywheelProps {
  size?: number;
  spin?: boolean;
  /** 高亮第几个节点（0-based），不传则不高亮 */
  active?: number;
}

const COLORS = ['#FFD12E', '#16C79A', '#2B5BE8', '#FF4D4D', '#FFD12E', '#16C79A'];

/** 飞轮：6 步闭环（选题→生产→成片→发布→复盘→反哺→回选题）越转越省力 */
export function Flywheel({ size = 360, spin = true, active }: FlywheelProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const n = FLYWHEEL.length;

  const nodes = FLYWHEEL.map((step, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      ...step,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      color: COLORS[i % COLORS.length],
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="AI 飞轮闭环">
      {/* 旋转的轨道箭头层 */}
      <motion.g
        style={{ originX: '50%', originY: '50%' }}
        animate={spin ? { rotate: 360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A1A1A" strokeWidth={2.5} strokeDasharray="2 10" strokeLinecap="round" />
      </motion.g>

      {/* 方向箭头：顺时针几个小三角 */}
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % n];
        const mx = (node.x + next.x) / 2;
        const my = (node.y + next.y) / 2;
        const ang = Math.atan2(next.y - node.y, next.x - node.x) * (180 / Math.PI);
        return (
          <g key={`arr-${i}`} transform={`translate(${mx} ${my}) rotate(${ang})`}>
            <path d="M -5 -5 L 5 0 L -5 5 Z" fill="#1A1A1A" />
          </g>
        );
      })}

      {/* 节点 */}
      {nodes.map((node, i) => {
        const isActive = active === i;
        return (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 34 : 30}
              fill={isActive ? node.color : '#FFF8EC'}
              stroke="#1A1A1A"
              strokeWidth={2.5}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Source Han Sans SC','PingFang SC',sans-serif"
              fontWeight={900}
              fontSize={15}
              fill="#1A1A1A"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* 圆心招牌词 */}
      <g>
        <circle cx={cx} cy={cy} r={size * 0.13} fill="#1A1A1A" />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fontFamily="'Source Han Sans SC','PingFang SC',sans-serif"
          fontWeight={900}
          fontSize={22}
          fill="#16C79A"
        >
          AI
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontFamily="'Source Han Sans SC','PingFang SC',sans-serif"
          fontWeight={900}
          fontSize={22}
          fill="#FFF8EC"
        >
          飞轮
        </text>
      </g>
    </svg>
  );
}
