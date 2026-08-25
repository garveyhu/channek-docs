import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NAV_SECTIONS } from '@/data/workflow';

const IDS = NAV_SECTIONS.map((s) => s.id);

/**
 * 右侧悬浮 TOC 导航：全标签常显 · scroll-spy 高亮 · 点击平滑跳转。
 * 首页（top）隐藏整条；滚进正文才淡入。主次靠字重 / 色阶 / 左侧薄荷青条，而非 hover。
 */
export function SectionNav() {
  const active = useScrollSpy(IDS);
  const show = active !== 'top';

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="章节导航"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-0.5 rounded-2xl border-[2.5px] border-ink bg-paper/85 p-2.5 shadow-[4px_4px_0_#1A1A1A] backdrop-blur-md transition-all duration-300 lg:flex ${
        show ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'
      }`}
    >
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            aria-current={isActive ? 'true' : undefined}
            className={`group flex items-center gap-2 rounded-lg py-1 pl-1.5 pr-3 text-left transition-colors ${
              isActive ? 'bg-paper-2' : 'hover:bg-paper-2/60'
            }`}
          >
            <span
              className={`h-4 w-[3px] shrink-0 rounded-full transition-colors ${
                isActive ? 'bg-mint' : 'bg-ink/15 group-hover:bg-ink/40'
              }`}
            />
            <span
              className={`font-mono text-[9px] tabular-nums transition-colors ${
                isActive ? 'text-mint' : 'text-ink-soft/70'
              }`}
            >
              {s.num}
            </span>
            <span
              className={`whitespace-nowrap text-[12px] transition-colors ${
                isActive ? 'font-black text-ink' : 'font-medium text-ink-soft group-hover:text-ink'
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
