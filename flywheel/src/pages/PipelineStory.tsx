import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionNav } from '@/components/SectionNav';
import { Hero } from '@/sections/Hero';
import { KernelModel } from '@/sections/KernelModel';
import { ZoneMap } from '@/sections/ZoneMap';
import { Pipeline } from '@/sections/Pipeline';
import { PluginAtlas } from '@/sections/PluginAtlas';
import { Split } from '@/sections/Split';
import { VideoAsText } from '@/sections/VideoAsText';
import { ArtifactChain } from '@/sections/ArtifactChain';
import { HonestRail } from '@/sections/HonestRail';
import { BrandFace } from '@/sections/BrandFace';
import { FlywheelSection } from '@/sections/FlywheelSection';
import { Replicate } from '@/sections/Replicate';
import { Footer } from '@/sections/Footer';

/**
 * 《飞轮的内部》—— 飞轮日记频道在 Channek 架构下如何运转的滚动叙事。
 * 挂在文档站的 /story/ 路径下，是文档之外的独立入口：
 * 文档讲「怎么开发」，这页讲「一个真实频道跑起来是什么样」。
 */
export default function PipelineStory() {
  return (
    <div className="min-h-screen bg-paper">
      <ScrollProgress />
      <SectionNav />
      <main>
        <Hero />
        <KernelModel />
        <ZoneMap />
        <Pipeline />
        <PluginAtlas />
        <Split />
        <VideoAsText />
        <ArtifactChain />
        <HonestRail />
        <BrandFace />
        <FlywheelSection />
        <Replicate />
      </main>
      <Footer />
    </div>
  );
}
