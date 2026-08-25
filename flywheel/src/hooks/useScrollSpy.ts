import { useEffect, useState } from 'react';

/**
 * 滚动监听：返回当前位于视口中线的 section id。
 * 用一条「视口中线」窄带（rootMargin）做判据——任意时刻只有一个 section 跨过中线，
 * 对 520vh 钉住的流水线同样成立（钉住期间它始终跨中线 = 始终高亮）。
 */
export function useScrollSpy(ids: readonly string[], rootMargin = '-48% 0px -48% 0px') {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
