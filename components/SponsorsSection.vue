<script setup lang="ts">
import { withBase } from 'ufo'
import { pixelSlideIn, pixelFadeIn } from '~/composables/usePixelAnimation'
import SponsorModal from './SponsorModal.vue'

// 赞助商数据
const sponsorDescriptions: Record<string, string> = {
  'TRAE': '为每位选手免费提供为期一个月的 Trae Pro 会员服务。选手可充分利用 Trae 提供的强大 AI 开发环境、高效的智能体编排工具以及丰富的知识库与连接器。',
  '算能科技': '由比特大陆孵化的 SophNet 云算力平台基于算能自研 TPU 算力，为开发者提供一站式模型服务。🖥️ 同时提供 10 台 H200 服务器供赛队使用。',
  '百度飞桨': '提供全面的深度学习框架和丰富的预训练模型库。',
  '阿里魔搭': '提供适配开源大模型的应用开发框架和多模态模型服务。',
  '北京智源研究院': '作为赛事指导单位，提供人工智能领域的前沿技术指导与学术支持。',
  '中科紫东太初': '作为赛事指导单位，提供多模态大模型技术支持与指导。',
  '武汉人工智能研究院': '作为赛事指导单位，提供人工智能技术研发与应用指导。',
  '老鹰基金': '作为赛事指导单位，提供创业投资与产业资源支持。',
  '中国电信天翼AI': '作为赛事指导单位，提供云计算与大数据人工智能技术支持。',
  '非夕科技': '提供高精度力控机械臂技术支持。',
  '地瓜机器人': '提供 RDK X5 机器人开发者套件。',
  'SeeedStudio': '提供开源机械臂、边缘计算模块、传感器。',
  '拓竹Cyberbrick': '模块化编程机器人与 3D 打印机支持。',
  '云鲸智能': '提供智能机器人技术支持与产品体验资源。',
  '观潮KwanTeo': '社区伙伴，为极客节提供媒体支持。',
  'OpenBuild': '社区伙伴，为极客节提供开发者社区资源。',
  '硅星人': '社区伙伴，为极客节提供科技媒体报道。',
  '深圳科创学院': '社区伙伴，提供创新创业教育资源。',
  'AIAgent2025': '社区伙伴，提供AI智能体技术社区。',
  '汕头市潮阳实验学校': '作为指导单位，提供场地与教育资源支持。',
  '汕头市潮阳实验学校教育慈善基金会': '作为指导单位，提供教育慈善与资源支持。',
  '普宁市潮实高级中学': '作为指导单位，提供场地与教育资源支持。',
  '汕头华侨经济文化合作试验区管委会': '作为指导单位，提供政策指导与资源对接支持。',
  '潮阳实验学校北京校友会': '作为主办单位，统筹赛事策划与组织工作。',
  '去探索': '社区伙伴，为极客节提供社区支持。',
  'Tosea.ai': '提供AI Slides智能幻灯片生成工具的使用权限，助力参赛选手高效制作演示文稿。',
}

const sponsorUrls: Record<string, string> = {
  'TRAE': 'https://trae.ai',
  '算能科技': 'https://sophnet.com',
  '百度飞桨': 'https://www.paddlepaddle.org.cn',
  '阿里魔搭': 'https://modelscope.cn',
  '北京智源研究院': 'https://www.baai.ac.cn',
  '中科紫东太初': 'https://www.taichu.com.cn',
  '武汉人工智能研究院': 'https://www.wairi.cn',
  '老鹰基金': 'https://www.eaglefund.cn',
  '中国电信天翼AI': 'https://www.ctyun.cn',
  '非夕科技': 'https://www.flexiv.cn',
  '地瓜机器人': 'https://www.d-robotics.cc',
  'SeeedStudio': 'https://www.seeedstudio.com',
  '拓竹Cyberbrick': 'https://bambulab.cn',
  '云鲸智能': 'https://www.narwal.com',
  '观潮KwanTeo': 'https://36kr.com/user/217422981',
  'OpenBuild': 'https://openbuild.xyz',
  '硅星人': 'https://36kr.com/user/5136820016',
  '深圳科创学院': 'https://www.innoxsz.com',
  'AIAgent2025': 'https://aiagent2025.com',
  '汕头市潮阳实验学校': 'https://www.cysy.com.cn',
  '普宁市潮实高级中学': 'https://www.cysy.com.cn',
  '汕头市潮阳实验学校教育慈善基金会': 'https://www.cysy.com.cn',
  '去探索': 'https://qutansuo.cn',
  'Tosea.ai': 'https://tosea.ai',
}

const sponsorLogos: Record<string, string> = {
  '汕头市潮阳实验学校': '/sponsors/cysy.png',
  '汕头市潮阳实验学校教育慈善基金会': '/sponsors/cysy-foundation.png',
  '普宁市潮实高级中学': '/sponsors/puning-chaoshi.png',
  '潮阳实验学校北京校友会': '/sponsors/cysy-bj-alumni.png',
  '北京智源研究院': '/sponsors/baai.png',
  '百度飞桨': '/sponsors/paddlepaddle.png',
  '阿里魔搭': '/sponsors/modelscope.png',
  '中国电信天翼AI': '/sponsors/tianyiai.png',
  '中科紫东太初': '/sponsors/taichu.png',
  '武汉人工智能研究院': '/sponsors/wairi.png',
  '老鹰基金': '/sponsors/eaglefund.png',
  '算能科技': '/sponsors/sophgo.png',
  'TRAE': '/sponsors/trae.png',
  '地瓜机器人': '/sponsors/digua.png',
  '非夕科技': '/sponsors/flexiv.png',
  'SeeedStudio': '/sponsors/seeedstudio.png',
  '拓竹Cyberbrick': '/sponsors/cyberbrick.svg',
  '云鲸智能': '/sponsors/narwal.png',
  '观潮KwanTeo': '/sponsors/kwanteo.png',
  'OpenBuild': '/sponsors/openbuild.png',
  '硅星人': '/sponsors/guixingren.png',
  '深圳科创学院': '/sponsors/x-institute.png',
  'AIAgent2025': '/sponsors/aiagent2025.png',
  '汕头华侨经济文化合作试验区管委会': '/sponsors/sthq.png',
  '去探索': '/sponsors/qutansuo.png',
  'Tosea.ai': '/sponsors/tosea.png',
}

// 终端显示的赞助商行数据
type SponsorCategory = 'supervisor' | 'organizer' | 'guidance' | 'track' | 'community'

interface SponsorLine {
  category: SponsorCategory
  name: string
  color: string
}

const categoryMeta: Record<SponsorCategory, { label: string; headingClass: string }> = {
  supervisor: { label: '指导单位', headingClass: 'text-yellow-600' },
  organizer: { label: '主办单位', headingClass: 'text-orange-600' },
  guidance: { label: '赛事指导单位', headingClass: 'text-cyan-600' },
  track: { label: '赛道支持单位', headingClass: 'text-green-600' },
  community: { label: '社区伙伴', headingClass: 'text-purple-600' },
}

const sponsorLines: SponsorLine[] = [
  // 指导单位
  { category: 'supervisor', name: '汕头市潮阳实验学校', color: 'text-yellow-400' },
  { category: 'supervisor', name: '普宁市潮实高级中学', color: 'text-yellow-400' },
  { category: 'supervisor', name: '汕头市潮阳实验学校教育慈善基金会', color: 'text-yellow-400' },
  { category: 'supervisor', name: '汕头华侨经济文化合作试验区管委会', color: 'text-yellow-400' },
  // 主办单位
  { category: 'organizer', name: '潮阳实验学校北京校友会', color: 'text-orange-400' },
  // 赛事指导
  { category: 'guidance', name: '北京智源研究院', color: 'text-cyan-400' },
  { category: 'guidance', name: '百度飞桨', color: 'text-cyan-400' },
  { category: 'guidance', name: '阿里魔搭', color: 'text-cyan-400' },
  { category: 'guidance', name: '中国电信天翼AI', color: 'text-cyan-400' },
  { category: 'guidance', name: '中科紫东太初', color: 'text-cyan-400' },
  { category: 'guidance', name: '武汉人工智能研究院', color: 'text-cyan-400' },
  { category: 'guidance', name: '老鹰基金', color: 'text-cyan-400' },
  // 赛道支持
  { category: 'track', name: '算能科技', color: 'text-green-400' },
  { category: 'track', name: 'TRAE', color: 'text-green-400' },
  { category: 'track', name: '地瓜机器人', color: 'text-green-400' },
  { category: 'track', name: '非夕科技', color: 'text-green-400' },
  { category: 'track', name: 'SeeedStudio', color: 'text-green-400' },
  { category: 'track', name: '拓竹Cyberbrick', color: 'text-green-400' },
  { category: 'track', name: '云鲸智能', color: 'text-green-400' },
  { category: 'track', name: 'Tosea.ai', color: 'text-green-400' },  
  // 社区伙伴
  { category: 'community', name: '观潮KwanTeo', color: 'text-purple-400' },
  { category: 'community', name: 'OpenBuild', color: 'text-purple-400' },
  { category: 'community', name: '硅星人', color: 'text-purple-400' },
  { category: 'community', name: '深圳科创学院', color: 'text-purple-400' },
  { category: 'community', name: 'AIAgent2025', color: 'text-purple-400' },
  { category: 'community', name: '去探索', color: 'text-purple-400' },
]

const baseURL = useRuntimeConfig().app.baseURL || '/'
const logoSrc = (path: string) => withBase(path, baseURL)

// 打字机动画状态
const visibleLines = ref(0)
const isTypingComplete = ref(false)
const commandInput = ref('')
const showCursor = ref(true)
const isTerminalVisible = ref(false)
const terminalInput = ref<HTMLInputElement | null>(null)
const terminalBodyRef = ref<HTMLElement | null>(null)

// 命令历史记录
interface CommandEntry {
  command: string
  output: string[]
  clickableSponsors?: SponsorLine[]
}
const commandHistory = ref<CommandEntry[]>([])

// 弹窗状态
const isModalOpen = ref(false)
const selectedSponsor = ref<{ name: string; logo: string; description: string; url?: string } | null>(null)

const openSponsorModal = (name: string) => {
  selectedSponsor.value = {
    name,
    logo: sponsorLogos[name] || '',
    description: sponsorDescriptions[name] || '暂无详细介绍',
    url: sponsorUrls[name],
  }
  isModalOpen.value = true
}

const closeSponsorModal = () => {
  isModalOpen.value = false
  selectedSponsor.value = null
}

// 打字机动画
const startTypewriter = () => {
  if (isTypingComplete.value) return
  isTerminalVisible.value = true
  
  const typeNextLine = () => {
    if (visibleLines.value < sponsorLines.length) {
      visibleLines.value++
      nextTick(() => {
        if (!terminalBodyRef.value) return
        terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight
      })
      setTimeout(typeNextLine, 80)
    } else {
      isTypingComplete.value = true
      nextTick(() => {
        terminalInput.value?.focus()
      })
    }
  }
  
  setTimeout(typeNextLine, 300)
}

// 光标闪烁
onMounted(() => {
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

// 处理命令输入
const handleCommand = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    const cmd = commandInput.value.trim()
    const cmdLower = cmd.toLowerCase()
    
    if (!cmd) return
    
    let output: string[] = []
    let clickableSponsors: SponsorLine[] = []
    
    if (cmdLower === 'help') {
      output = [
        '<span class="text-primary">可用命令:</span>',
        '  <span class="text-cyan-400">ls [category]</span>  - 列出赞助商',
        '  <span class="text-cyan-400">cat [name]</span>     - 查看赞助商详情',
        '  <span class="text-cyan-400">more</span>           - 查看完整赞助商页面',
        '  <span class="text-cyan-400">download</span>       - 下载参赛秩序手册',
        '  <span class="text-cyan-400">clear</span>          - 清空历史',
        '  <span class="text-cyan-400">become_sponsor</span> - 成为赞助商',
      ]
    } else if (cmdLower === 'more' || cmdLower === 'open') {
      output = [`<span class="text-green-400">Navigating to /sponsors...</span>`]
      commandHistory.value.push({ command: cmd, output, clickableSponsors: undefined })
      commandInput.value = ''
      setTimeout(() => {
        navigateTo('/sponsors')
      }, 300)
      return
    } else if (cmdLower === 'clear') {
      commandHistory.value = []
      commandInput.value = ''
      return
    } else if (cmdLower.startsWith('ls')) {
      const category = cmdLower.split(' ')[1]
      if (category) {
        const filtered = sponsorLines.filter(s => s.category === category)
        if (filtered.length > 0) {
          clickableSponsors = filtered
          output = [`<span class="text-muted-foreground">找到 ${filtered.length} 个赞助商 (点击查看详情):</span>`]
        } else {
          output = [
            `<span class="text-red-400">Category '${category}' not found.</span>`,
            '<span class="text-muted-foreground">Try: supervisor, organizer, guidance, track, community</span>'
          ]
        }
      } else {
        output = [
          '<span class="text-primary">Usage: ls [category]</span>',
          '',
          '<span class="text-muted-foreground">Available categories:</span>',
          '  <span class="text-yellow-400">supervisor</span>  - 指导单位',
          '  <span class="text-orange-400">organizer</span>   - 主办单位',
          '  <span class="text-cyan-400">guidance</span>    - 赛事指导单位',
          '  <span class="text-green-400">track</span>       - 赛道支持单位',
          '  <span class="text-purple-400">community</span>   - 社区伙伴',
        ]
      }
    } else if (cmdLower.startsWith('cat ')) {
      const name = cmd.slice(4)
      const sponsor = sponsorLines.find(s => s.name.toLowerCase().includes(name.toLowerCase()))
      if (sponsor) {
        openSponsorModal(sponsor.name)
        output = [`<span class="text-green-400">Opening ${sponsor.name}...</span>`]
      } else {
        output = [`<span class="text-red-400">Sponsor '${name}' not found.</span>`]
      }
    } else if (cmdLower === 'become_sponsor') {
      output = [`<span class="text-green-400">Opening email client...</span>`]
      setTimeout(() => {
        window.location.href = 'mailto:cysybeijing@163.com'
      }, 100)
    } else if (cmdLower === 'download' || cmdLower === 'dl' || cmdLower === 'get') {
      output = [`<span class="text-green-400">📥 正在下载参赛秩序手册...</span>`]
      setTimeout(() => {
        window.open('https://raw.githubusercontent.com/23-5-N-GeekDay/GeekDay2026/refs/heads/main/2026%E5%8C%97%E5%9B%9E%E5%BD%92%E7%BA%BF%E6%9E%81%E5%AE%A2%E8%8A%82%E9%BB%91%E5%AE%A2%E9%A9%AC%E6%8B%89%E6%9D%BE%E5%8F%82%E8%B5%9B%E7%A7%A9%E5%BA%8F%E5%86%8C.pdf', '_blank')
      }, 100)
    } else {
      // 尝试匹配赞助商名称
      const sponsor = sponsorLines.find(s => s.name.toLowerCase().includes(cmdLower))
      if (sponsor) {
        openSponsorModal(sponsor.name)
        output = [`<span class="text-green-400">Opening ${sponsor.name}...</span>`]
      } else {
        output = [
          `<span class="text-red-400">bash: ${cmd}: command not found</span>`,
          `<span class="text-muted-foreground">输入 'help' 查看可用命令</span>`
        ]
      }
    }
    
    commandHistory.value.push({
      command: cmd,
      output,
      clickableSponsors: clickableSponsors.length > 0 ? clickableSponsors : undefined
    })
    
    commandInput.value = ''
  }
}

// 打开联系邮箱
const openContactEmail = () => {
  window.location.href = 'mailto:cysybeijing@163.com'
}

// Intersection Observer 触发动画
const terminalRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isTerminalVisible.value) {
          startTypewriter()
        }
      })
    },
    { threshold: 0.3 }
  )
  
  if (terminalRef.value) {
    observer.observe(terminalRef.value)
  }
})
</script>

<template>
  <section id="sponsors" class="py-24 px-6">
    <div class="max-w-4xl mx-auto">
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
        class="font-pixel-cn text-2xl md:text-3xl mb-8"
      >
        合作伙伴
      </h2>

      <!-- 终端窗口 - 对齐 error.vue 风格 -->
      <div
        ref="terminalRef"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="pixel-card overflow-hidden"
      >
        <!-- Terminal Header -->
        <div class="flex items-center gap-2 px-4 py-3 bg-card border-b-2 border-border/50">
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span class="ml-4 font-pixel text-xs text-muted-foreground flex-1 text-center">
            ~/geekday/sponsors
          </span>
          <NuxtLink
            to="/sponsors"
            class="font-pixel text-xs text-primary hover:text-primary/80 transition-colors"
          >
            [MORE]
          </NuxtLink>
        </div>

        <!-- Terminal Content -->
        <div
          ref="terminalBodyRef"
          class="p-6 bg-[#0a0f0a]/80 backdrop-blur-sm font-mono min-h-[400px] max-h-[500px] overflow-y-auto"
        >
          <!-- 欢迎信息 -->
          <div class="flex items-start gap-2 mb-4">
            <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
            <span class="font-pixel-cn text-sm text-foreground/80">cat sponsors.md</span>
          </div>

          <!-- Separator -->
          <div class="border-t border-dashed border-primary/30 mb-4"></div>

          <!-- 赞助商列表 - 打字机效果 -->
          <template v-for="(sponsor, index) in sponsorLines" :key="sponsor.name">
            <!-- 分类标题 -->
            <div
              v-if="visibleLines > index && (index === 0 || sponsor.category !== sponsorLines[index - 1].category)"
              class="mt-4 mb-2"
            >
              <span :class="[categoryMeta[sponsor.category].headingClass, 'font-pixel text-xs']">
                # {{ categoryMeta[sponsor.category].label }}
              </span>
            </div>

            <!-- 赞助商行 -->
            <div 
              v-if="visibleLines > index"
              class="sponsor-line flex items-center gap-2 py-1 cursor-pointer hover:bg-primary/5 px-2 -mx-2 rounded transition-colors"
              @click="openSponsorModal(sponsor.name)"
            >
              <span class="text-muted-foreground font-pixel text-xs">-</span>
              <span :class="[sponsor.color, 'font-pixel-cn text-sm hover:underline']">{{ sponsor.name }}</span>
            </div>
          </template>

          <!-- 命令历史记录 -->
          <div v-if="commandHistory.length > 0" class="mt-6 border-t border-dashed border-primary/30 pt-4">
            <div v-for="(entry, i) in commandHistory" :key="i" class="mb-4">
              <!-- 命令行 -->
              <div class="flex items-start gap-2">
                <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
                <span class="font-pixel-cn text-sm text-foreground/80">{{ entry.command }}</span>
              </div>
              <!-- 输出 -->
              <div class="ml-[88px] mt-1">
                <p 
                  v-for="(line, j) in entry.output" 
                  :key="j" 
                  class="font-pixel-cn text-sm text-foreground/80"
                  v-html="line"
                ></p>
                <!-- 可点击的赞助商列表 -->
                <div 
                  v-for="sponsor in (entry.clickableSponsors || [])" 
                  :key="sponsor.name"
                  class="flex items-center gap-2 py-0.5 cursor-pointer hover:bg-primary/5 px-2 -mx-2 rounded transition-colors"
                  @click="openSponsorModal(sponsor.name)"
                >
                  <span class="text-muted-foreground font-pixel text-xs">-</span>
                  <span :class="[sponsor.color, 'font-pixel-cn text-sm hover:underline']">{{ sponsor.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- become_sponsor 命令 -->
          <div 
            v-if="isTypingComplete"
            class="mt-6 border-t border-dashed border-primary/30 pt-4"
          >
            <div 
              class="become-sponsor flex items-center gap-2 cursor-pointer hover:bg-primary/5 px-2 -mx-2 py-1 rounded transition-colors"
              @click="openContactEmail"
            >
              <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
              <span class="font-pixel-cn text-sm text-pink-400 hover:underline">become_sponsor</span>
              <span class="font-pixel-cn text-sm text-muted-foreground">--email cysybeijing@163.com</span>
            </div>
          </div>

          <!-- 命令输入行 -->
          <div v-if="isTypingComplete" class="mt-4 flex items-center gap-2">
            <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
            <input
              ref="terminalInput"
              v-model="commandInput"
              type="text"
              class="flex-1 bg-transparent border-none outline-none font-pixel-cn text-sm text-foreground/80 caret-primary"
              placeholder="输入 help 查看命令..."
              autocomplete="off"
              spellcheck="false"
              @keydown="handleCommand"
            />
            <span 
              class="w-2 h-4 bg-primary"
              :class="{ 'opacity-0': !showCursor }"
            ></span>
          </div>

          <!-- 打字中的光标 -->
          <div v-else class="mt-4 flex items-center gap-2">
            <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
            <span class="w-2 h-4 bg-primary animate-pulse"></span>
          </div>
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

<style scoped>
.sponsor-line {
  animation: fadeIn 0.1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.become-sponsor {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

input::placeholder {
  @apply text-muted-foreground/50;
}
</style>
