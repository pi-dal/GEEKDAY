<script setup lang="ts">
import { withBase } from 'ufo'
import { pixelSlideIn, pixelFadeIn, staggerContainer } from '~/composables/usePixelAnimation'
import SponsorModal from './SponsorModal.vue'

// 赞助商描述数据
const sponsorDescriptions: Record<string, string> = {
  'TRAE': '为每位选手免费提供为期一个月的 Trae Pro 会员服务。选手可充分利用 Trae 提供的强大 AI 开发环境、高效的智能体编排工具以及丰富的知识库与连接器，无需从零搭建底层架构，即可快速实现智能体的逻辑设计、记忆管理、多工具调用与复杂任务执行，显著提升智能体的行动能力与开发效率。',
  '算能科技': '由比特大陆孵化的 SophNet 云算力平台基于算能自研 TPU 算力，为开发者提供一站式模型服务。提供近百款文本、视频、图像、语音、向量模型，兼容 OpenAI、Anthropic 接口，支持 Prefix、Tools、Json 功能。\n\n提供高速度、高并发、高吞吐的大模型 API 服务，以 Deepseek V3 fast 为例，推理速度超 100 tokens/s，达到行业平均水平的 5 倍以上。\n\n提供语音转文本、文档解析、OCR、Embeddings 等常用 AI 助手接口，Chat+TTS 和端到端实时语音对话功能。支持 OfficeAI、Claude Code、Coze、ARGO、Dify 等热门工具接入。\n\nSophgallery 提供多模态内容创作自由画布，接入 Wan2.6、即梦等前沿模型，实现可视化拖拽工作流。让企业和开发者实现真正的模型与算力自由，加速 AI 计算普惠人类。\n\n🖥️ 同时，算能将提供 10 台 H200 服务器，供赛队完成模型训练、部署。',
  '百度飞桨': '提供全面的深度学习框架和丰富的预训练模型库。选手可直接调用飞桨的各类模型能力（如对话语言模型、文本生成模型、图像识别与生成模型等），无需自行训练底层模型，即可赋予 Agent 语言理解、内容创作、视觉分析等智能功能，加速实现智能体的认知大脑。',
  '阿里魔搭': '提供适配开源大模型的应用开发框架和多模态模型服务。开发者可以利用魔搭社区提供的框架，以开源大语言模型为核心，灵活运用记忆管理、工具调用等模块，高效构建各类大语言模型应用（LLM Apps）、模型上下文协议服务（MCP Server）或自定义工具（Tools），实现任务规划、多工具协同等高级能力。\n\n魔搭平台还汇聚了海量预训练模型（涵盖语言、视觉、语音等），方便开发者按需调用，为应用拓展技能模组以实现复杂任务。',
  '天翼AI': '作为赛事指导单位，为极客节提供技术指导与支持。',
  '非夕科技': '智源研究院提供最新发布的通用 VLA 模型 RoboBrain-X，在 RoboBrain 多模态基座能力与 RoboBrain 2.0 数据的基础上，进一步融合真实机器人动作数据，实现了从感知到执行的一体化能力。\n\n该模型通过统一建模视觉、语言与动作解决了跨机器人本体的泛化适配问题，其核心设计是将各类机器人的控制信号映射到以末端执行器三维位姿为标准的统一动作空间，并借助动作分词器与分组残差量化技术，把复杂控制轨迹转化为可共享的动作原语 token。\n\n这种设计让松灵机械臂、Franka 机械臂、星海图机器人等不同形态的设备能共用同一套"动作语言"执行任务，目前已实现零样本完成拾取、放置等基础操作，仅需少量样本微调，就能应对复杂任务的拆解与执行。',
  'SeeedStudio': '提供开源机械臂（如 Lerobot Arm）、边缘计算模块（如 NVIDIA Jetson 兼容板）、传感器，支持快速搭建轻量化具身系统，适合低成本、创意化的场景落地。',
  '拓竹Cyberbrick': '模块化编程机器人（支持低代码拖拽编程，可快速搭建支架、触发装置、简单传动结构），无需复杂硬件开发，1 小时内可完成基础结构搭建。\n\n3D 打印机支持 PLA 材质快速打印（小尺寸零件 30 分钟 - 2 小时可完成），可即时生成具身系统所需的定制化实体部件（如机械臂末端专属抓手、场景适配的小尺寸支架、互动装置配件），实现"数字设计→实体落地"的即时转化。',
  '观潮KwanTeo': '社区伙伴，为极客节提供媒体支持与社区传播资源。',
  'OpenBuild': '社区伙伴，为极客节提供开发者社区资源与技术交流平台支持。',
  '硅星人': '社区伙伴，为极客节提供科技媒体报道与内容传播支持。',
}

// 赞助商官网链接
const sponsorUrls: Record<string, string> = {
  'TRAE': 'https://trae.ai',
  '算能科技': 'https://sophnet.com',
  '百度飞桨': 'https://www.paddlepaddle.org.cn',
  '阿里魔搭': 'https://modelscope.cn',
  '天翼AI': 'https://www.teleai.com.cn',
  '非夕科技': 'https://www.flexiv.cn',
  'SeeedStudio': 'https://www.seeedstudio.com',
  '拓竹Cyberbrick': 'https://bambulab.cn',
  '观潮KwanTeo': 'https://36kr.com/user/217422981',
  'OpenBuild': 'https://openbuild.xyz',
  '硅星人': 'https://36kr.com/user/5136820016',
}

// 赛事指导单位
const guidanceSponsors = [
  { name: '百度飞桨', logo: '/sponsors/paddlepaddle.png' },
  { name: '阿里魔搭', logo: '/sponsors/modelscope.png' },
  { name: '天翼AI', logo: '/sponsors/tianyiai.png' },
]

// 赛道支持单位
const trackSponsors = [
  { name: '算能科技', logo: '/sponsors/sophgo.png' },
  { name: 'TRAE', logo: '/sponsors/trae.png' },
  { name: '非夕科技', logo: '/sponsors/flexiv.png' },
  { name: 'SeeedStudio', logo: '/sponsors/seeedstudio.png' },
  { name: '拓竹Cyberbrick', logo: '/sponsors/cyberbrick.svg' },
]

// 社区伙伴
const communityPartners = [
  { name: '观潮KwanTeo', logo: '/sponsors/kwanteo.png' },
  { name: 'OpenBuild', logo: '/sponsors/openbuild.png' },
  { name: '硅星人', logo: '/sponsors/guixingren.png' },
]

const baseURL = useRuntimeConfig().app.baseURL || '/'
const logoSrc = (path: string) => withBase(path, baseURL)

// 弹窗状态
const isModalOpen = ref(false)
const selectedSponsor = ref<{ name: string; logo: string; description: string; url?: string } | null>(null)

const openSponsorModal = (sponsor: { name: string; logo: string }) => {
  selectedSponsor.value = {
    name: sponsor.name,
    logo: sponsor.logo,
    description: sponsorDescriptions[sponsor.name] || '暂无详细介绍',
    url: sponsorUrls[sponsor.name],
  }
  isModalOpen.value = true
}

const closeSponsorModal = () => {
  isModalOpen.value = false
  selectedSponsor.value = null
}

const sponsorCard = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}
</script>

<template>
  <section id="sponsors" class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          {"<<"} PARTNERS {">>"}
        </span>
      </div>

      <h2
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="font-pixel-cn text-2xl md:text-3xl mb-12"
      >
        合作伙伴
      </h2>

      <!-- 赛事指导单位 -->
      <div class="mb-12">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 赛事指导单位
        </h3>
        <div
          v-motion
          class="grid grid-cols-2 md:grid-cols-3 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in guidanceSponsors"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            @click="openSponsorModal(sponsor)"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-12 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- 赛道支持单位 -->
      <div class="mb-12">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 赛道支持单位
        </h3>
        <div
          v-motion
          class="grid grid-cols-2 md:grid-cols-5 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in trackSponsors"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            @click="openSponsorModal(sponsor)"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-10 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- 社区伙伴 -->
      <div class="mb-8">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 社区伙伴
        </h3>
        <div
          v-motion
          class="grid grid-cols-3 md:grid-cols-3 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in communityPartners"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            @click="openSponsorModal(sponsor)"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-8 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: 600 } }"
        class="mt-8 text-center space-y-4"
      >
        <a
          href="mailto:cysybeijing@163.com"
          v-motion
          class="font-pixel-cn text-sm text-primary hover:underline inline-block"
          :hover="{ x: 5 }"
        >
          ▶ 成为赞助商
        </a>
        <div>
          <NuxtLink
            to="/sponsors"
            v-motion
            class="inline-block font-pixel text-xs text-primary hover:text-[#B185DB] transition-colors"
            :hover="{ x: 5 }"
          >
            [ READ MORE... ]
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Sponsor Modal -->
  <SponsorModal
    :visible="isModalOpen"
    :sponsor="selectedSponsor"
    @close="closeSponsorModal"
  />
</template>
