import { EmoCat } from '@/components/EmoCat';
import { BRAND } from '@/data/workflow';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-6 py-20">
      <div className="bg-dotgrid absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <EmoCat expr="love" float className="mb-6 w-28" />
        <p className="heading-xl mb-4 text-3xl text-paper md:text-4xl">「{BRAND.stance}」</p>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-paper/50">
          这个站把飞轮日记在 Channek 里的运转拆开摊给你看。事实源是频道的
          <code className="mx-1 font-mono text-mint">channel.json</code>
          与它点名的插件清单——改流程先改卡，这里只是它的镜子。
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-paper/40">
          <span className="rounded-full border border-paper/20 px-3 py-1">飞轮日记</span>
          <span className="rounded-full border border-paper/20 px-3 py-1">1 个文件夹 + 1 张卡 · 9 步</span>
          <span className="rounded-full border border-paper/20 px-3 py-1">Channek</span>
        </div>
        <a
          href="/"
          className="font-mono text-xs text-paper/50 underline decoration-mint decoration-2 underline-offset-4 transition-colors hover:text-paper"
        >
          ← 回 Channek 文档
        </a>
      </div>
    </footer>
  );
}
