<template>
  <div class="min-h-screen">
    <!-- Navbar spacer -->
    <div class="h-16"></div>
    
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div v-if="page">
        <!-- Terminal Window -->
        <div class="pixel-card overflow-hidden">
          <!-- Terminal Header -->
          <div class="flex items-center gap-2 px-4 py-3 bg-card border-b-2 border-border/50">
            <div class="flex gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
            <span class="ml-4 font-pixel text-xs text-muted-foreground flex-1 text-center">
              {{ terminalPath }}
            </span>
            <NuxtLink
              to="/"
              class="font-pixel text-xs text-primary hover:text-primary/80 transition-colors"
            >
              [HOME]
            </NuxtLink>
          </div>
          
          <!-- Terminal Content -->
          <div class="p-6 bg-[#0a0f0a]/80 backdrop-blur-sm font-mono">
            <!-- Command prompt -->
            <div class="flex items-start gap-2 mb-6">
              <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
              <span class="font-pixel-cn text-sm text-foreground/80">cat {{ page.title }}.md</span>
            </div>
            
            <!-- Separator -->
            <div class="border-t border-dashed border-primary/30 mb-6"></div>
            
            <!-- Content Header -->
            <header class="mb-8">
              <h1 class="text-2xl md:text-3xl font-pixel-cn text-gradient mb-4">
                {{ page.title }}
              </h1>
              <p v-if="page.description" class="font-pixel-cn text-lg text-muted-foreground mb-4">
                {{ page.description }}
              </p>
              <div v-if="page.date" class="font-pixel text-xs text-primary/60">
                Last modified: {{ formatDate(page.date) }}
              </div>
            </header>
            
            <!-- Rendered Content -->
            <ContentRenderer
              :value="page"
              class="terminal-content prose prose-invert prose-lg max-w-none
                   prose-headings:font-pixel-cn prose-headings:text-primary prose-headings:border-b prose-headings:border-primary/30 prose-headings:pb-2 prose-headings:mb-4
                   prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                   prose-p:font-pixel-cn prose-p:text-foreground/90 prose-p:leading-relaxed
                   prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/50 hover:prose-a:border-primary
                   prose-code:bg-primary/10 prose-code:text-primary prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                   prose-pre:bg-[#0d120d] prose-pre:border-2 prose-pre:border-primary/30 prose-pre:rounded-none
                   prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:not-italic
                   prose-ul:list-none prose-ol:list-decimal prose-li:relative
                   prose-strong:text-primary prose-strong:font-normal
                   prose-hr:border-primary/30 prose-hr:my-8 prose-hr:border-dashed
                   prose-img:rounded-none prose-img:border-2 prose-img:border-primary/30
                   prose-table:border-2 prose-table:border-primary/30
                   prose-th:bg-primary/10 prose-th:font-pixel-cn prose-th:text-sm
                   prose-td:border prose-td:border-primary/20 prose-td:font-pixel-cn"
            />
            
            <!-- Interactive Terminal -->
            <div class="mt-12 pt-6 border-t border-dashed border-primary/30">
              <!-- Command history -->
              <div v-for="(entry, index) in commandHistory" :key="index" class="mb-4">
                <div class="flex items-start gap-2">
                  <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
                  <span class="font-pixel-cn text-sm text-foreground/80">{{ entry.command }}</span>
                </div>
                <div 
                  v-if="entry.output" 
                  :class="['ml-[88px] font-pixel-cn text-sm mt-1', entry.isError ? 'text-red-400' : 'text-muted-foreground']"
                >
                  <span v-html="entry.output"></span>
                </div>
              </div>
              
              <!-- Command input -->
              <div class="flex items-center gap-2">
                <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
                <input
                  ref="terminalInput"
                  v-model="currentCommand"
                  @keydown.enter="executeCommand"
                  @keydown.up.prevent="navigateHistory(-1)"
                  @keydown.down.prevent="navigateHistory(1)"
                  type="text"
                  class="flex-1 bg-transparent border-none outline-none font-pixel-cn text-sm text-foreground/80 caret-primary"
                  placeholder="输入命令... (试试 help)"
                  autocomplete="off"
                  spellcheck="false"
                />
                <span class="w-2 h-4 bg-primary animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quick Navigation -->
        <div class="flex justify-between items-center mt-8 gap-4 flex-wrap">
          <NuxtLink
            to="/"
            class="pixel-card px-4 py-3 font-pixel-cn text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>返回首页</span>
          </NuxtLink>
          
          <div class="flex gap-2 flex-wrap">
            <NuxtLink
              v-if="route.path.includes('/tracks/')"
              to="/tracks/ai-agent"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/tracks/ai-agent' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              AI Agent
            </NuxtLink>
            <NuxtLink
              v-if="route.path.includes('/tracks/')"
              to="/tracks/embodied-ai"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/tracks/embodied-ai' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              Embodied AI
            </NuxtLink>
            <NuxtLink
              v-if="route.path.includes('/schedule/')"
              to="/schedule/day1"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/schedule/day1' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              DAY 1
            </NuxtLink>
            <NuxtLink
              v-if="route.path.includes('/schedule/')"
              to="/schedule/day2"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/schedule/day2' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              DAY 2
            </NuxtLink>
            <NuxtLink
              v-if="route.path.includes('/workshops/')"
              to="/workshops/ai-agent-dev"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/workshops/ai-agent-dev' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              AI Agent
            </NuxtLink>
            <NuxtLink
              v-if="route.path.includes('/workshops/')"
              to="/workshops/embodied-ai"
              :class="['pixel-card px-3 py-2 font-pixel text-xs transition-colors', route.path === '/workshops/embodied-ai' ? 'text-primary border-primary/50' : 'text-muted-foreground hover:text-foreground']"
            >
              Embodied AI
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <div class="pixel-card p-12 inline-block">
          <h2 class="text-4xl font-pixel text-red-400 mb-4">
            404
          </h2>
          <p class="font-pixel-cn text-lg text-muted-foreground mb-8">
            页面未找到
          </p>
          <NuxtLink to="/">
            <PixelButton class="font-pixel-cn">
              返回首页
            </PixelButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { withBase, withoutBase } from 'ufo'

const route = useRoute()
const router = useRouter()
const baseURL = useRuntimeConfig().app.baseURL || '/'
const logicalPath = computed(() => withoutBase(route.path, baseURL) || '/')
const toBase = (path: string) => withBase(path, baseURL)

const { data: page } = await useAsyncData(
  () => `content-page:${logicalPath.value}`,
  () => queryCollection('content').path(logicalPath.value).first(),
  { watch: [logicalPath] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const terminalPath = computed(() => {
  const path = logicalPath.value.replace(/^\//, '').replace(/\//g, '/') || 'home'
  return `~/geekday/${path}`
})

function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

useSeoMeta({
  title: page.value?.title ? `${page.value.title} | GEEKDAY` : 'GEEKDAY',
  description: page.value?.description || '北回归线极客节',
})

// Interactive terminal logic
interface CommandEntry {
  command: string
  output: string
  isError: boolean
}

const terminalInput = ref<HTMLInputElement | null>(null)
const currentCommand = ref('')
const commandHistory = ref<CommandEntry[]>([])
const historyIndex = ref(-1)
const inputHistory = ref<string[]>([])

const funnyErrors = [
  "🤖 我只是个假终端，别太为难我...",
  "🎮 这里是极客节，不是 Linux 课堂！",
  "💻 sudo make me a sandwich? 不存在的",
  "🚀 命令未找到，但梦想还在！",
  "🎯 输入 help 看看我会什么吧~",
  "🤷 rm -rf /? 你想得美！",
  "🐛 Bug 还是 Feature? 这是个问题",
  "⚡ 这个命令需要 10 万算力，等我去借点",
  "🎪 欢迎来到极客节虚拟终端！",
  "🔮 我预测你接下来会输入 help",
]

const helpText = `
<span class="text-primary">可用命令:</span>
  <span class="text-cyan-400">cd &lt;path&gt;</span>  - 导航到指定路径
  <span class="text-cyan-400">cd ..</span>      - 返回上一级
  <span class="text-cyan-400">cd /</span>       - 回到首页
  <span class="text-cyan-400">ls</span>         - 列出可用页面
  <span class="text-cyan-400">find</span>       - 显示完整页面树
  <span class="text-cyan-400">pwd</span>        - 显示当前路径
  <span class="text-cyan-400">clear</span>      - 清空终端
  <span class="text-cyan-400">help</span>       - 显示此帮助

<span class="text-muted-foreground">示例: cd /tracks/ai-agent</span>
`

const availablePages = [
  { path: '/', desc: '首页 - 北回归线极客节官网' },
  { path: '/about', desc: '关于北归节 - 赛事简介与背景' },
  { path: '/faq', desc: '常见问题 - 报名与参赛须知' },
  { path: '/prizes', desc: '奖项设置 - 奖金池与评分标准' },
  { path: '/sponsors', desc: '合作伙伴 - 指导单位与赞助商' },
  { path: '/schedule/day1', desc: '第一天日程 - 开幕式与开发启动' },
  { path: '/schedule/day2', desc: '第二天日程 - 路演与颁奖典礼' },
  { path: '/tracks/ai-agent', desc: 'AI Agent 赛道 - 大模型智能体' },
  { path: '/tracks/embodied-ai', desc: '具身智能赛道 - 机器人开发' },
  { path: '/workshops/ai-agent-dev', desc: 'AI Agent 工作坊 - 开发实战' },
  { path: '/workshops/embodied-ai', desc: '具身智能工作坊 - 入门教程' },
]

const findPagesOutput = `<span class="text-primary">📂 可用页面列表:</span><br><br><span class="text-yellow-400">/ 首页</span><br>  └─ <span class="text-cyan-400">/about</span>          关于北归节<br>  └─ <span class="text-cyan-400">/faq</span>            常见问题<br>  └─ <span class="text-cyan-400">/prizes</span>         奖项设置<br>  └─ <span class="text-cyan-400">/sponsors</span>       合作伙伴<br><br><span class="text-yellow-400">/schedule/ 活动日程</span><br>  └─ <span class="text-cyan-400">/schedule/day1</span>  第一天 (开幕式/开发启动)<br>  └─ <span class="text-cyan-400">/schedule/day2</span>  第二天 (路演/颁奖典礼)<br><br><span class="text-yellow-400">/tracks/ 赛道介绍</span><br>  └─ <span class="text-cyan-400">/tracks/ai-agent</span>     AI Agent 大模型智能体<br>  └─ <span class="text-cyan-400">/tracks/embodied-ai</span>  具身智能 机器人开发<br><br><span class="text-yellow-400">/workshops/ 技术工作坊</span><br>  └─ <span class="text-cyan-400">/workshops/ai-agent-dev</span>  AI Agent 开发实战<br>  └─ <span class="text-cyan-400">/workshops/embodied-ai</span>   具身智能入门<br><br><span class="text-muted-foreground">使用 cd &lt;路径&gt; 导航，例如: cd /tracks/ai-agent</span>`

function executeCommand() {
  const cmd = currentCommand.value.trim()
  if (!cmd) return
  
  // Add to history
  inputHistory.value.push(cmd)
  historyIndex.value = inputHistory.value.length
  
  const parts = cmd.split(/\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1).join(' ')
  
  let output = ''
  let isError = false
  
  switch (command) {
    case 'cd':
      handleCd(args)
      return // Don't add to history, we're navigating
      
    case 'ls':
      output = availablePages.map(p => 
        `<span class="text-cyan-400">${p.path.padEnd(25)}</span> <span class="text-muted-foreground">${p.desc}</span>`
      ).join('<br>')
      break
      
    case 'find':
      output = findPagesOutput
      break
      
    case 'pwd':
      output = `<span class="text-primary">${toBase(logicalPath.value)}</span>`
      break
      
    case 'clear':
      commandHistory.value = []
      currentCommand.value = ''
      return
      
    case 'help':
    case '?':
    case '--help':
      output = helpText
      break
      
    case 'whoami':
      output = '<span class="text-primary">geek</span> @ 北回归线极客节 🚀'
      break
      
    case 'date':
      output = new Date().toLocaleString('zh-CN')
      break
      
    case 'echo':
      output = args || ''
      break
      
    case 'sudo':
      output = '🔐 Permission denied. 这里不需要 sudo，我们相信每个极客！'
      isError = true
      break
      
    case 'rm':
    case 'mv':
    case 'cp':
      output = '🛡️ 危险操作已被阻止。这是只读文件系统，放心！'
      isError = true
      break
      
    case 'cat':
      output = '😺 喵~ 你已经在看内容了呀！往上滚动看看？'
      break
      
    case 'vim':
    case 'nano':
    case 'emacs':
      output = `🎮 ${command}? 这里是 2026 年，我们用 AI 写代码！`
      isError = true
      break
      
    case 'exit':
    case 'quit':
      output = '👋 要离开吗？用 <span class="text-cyan-400">cd /</span> 回到首页吧！'
      break
      
    case 'hack':
    case 'hackathon':
      output = '🔥 欢迎来到北回归线极客节黑客马拉松！<br>📅 48小时编程挑战等你来战！'
      break
      
    case 'coffee':
    case 'cafe':
      output = '☕ 请到现场领取免费咖啡，保持编程状态！'
      break
      
    case '42':
      output = '🌌 是的，这就是生命、宇宙以及任何事情的终极答案。'
      break
      
    default:
      output = `<span class="text-red-400">bash: ${command}: command not found</span><br><span class="text-muted-foreground">${funnyErrors[Math.floor(Math.random() * funnyErrors.length)]}</span>`
      isError = true
  }
  
  commandHistory.value.push({ command: cmd, output, isError })
  currentCommand.value = ''
  
  // Auto scroll to bottom
  nextTick(() => {
    terminalInput.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

function handleCd(path: string) {
  if (!path || path === '~') {
    // cd with no args or ~ goes to home
    navigateTo(toBase('/'))
    return
  }
  
  if (path === '/') {
    navigateTo(toBase('/'))
    return
  }
  
  if (path === '..') {
    // Go up one level
    const segments = route.path.split('/').filter(Boolean)
    if (segments.length <= 1) {
      navigateTo(toBase('/'))
    } else {
      segments.pop()
      navigateTo(toBase('/' + segments.join('/')))
    }
    return
  }
  
  if (path === '-') {
    // Go back (like cd -)
    router.back()
    return
  }
  
  // Handle absolute path
  if (path.startsWith('/')) {
    navigateTo(toBase(path))
    return
  }
  
  // Handle relative path
  const currentPath = logicalPath.value.endsWith('/') ? logicalPath.value : logicalPath.value + '/'
  let newPath = currentPath + path
  
  // Normalize the path (handle ..)
  const segments = newPath.split('/').filter(Boolean)
  const normalized: string[] = []
  for (const seg of segments) {
    if (seg === '..') {
      normalized.pop()
    } else if (seg !== '.') {
      normalized.push(seg)
    }
  }
  
  navigateTo(toBase('/' + normalized.join('/')))
}

function navigateHistory(direction: number) {
  const newIndex = historyIndex.value + direction
  if (newIndex >= 0 && newIndex < inputHistory.value.length) {
    historyIndex.value = newIndex
    currentCommand.value = inputHistory.value[newIndex]
  } else if (newIndex >= inputHistory.value.length) {
    historyIndex.value = inputHistory.value.length
    currentCommand.value = ''
  }
}

// Focus input on mount
onMounted(() => {
  // Add a small welcome message
  commandHistory.value.push({
    command: 'welcome',
    output: '👋 欢迎使用极客节终端！输入 <span class="text-cyan-400">help</span> 查看可用命令。',
    isError: false
  })
})
</script>

<style>
/* Custom list styling for terminal look */
.terminal-content ul li::before {
  content: '>';
  @apply text-primary mr-2 font-pixel text-xs;
}

.terminal-content ul li {
  @apply pl-0;
}

/* Table styling */
.terminal-content table {
  @apply w-full;
}

.terminal-content th {
  @apply text-left;
}

/* Code block styling */
.terminal-content pre {
  @apply overflow-x-auto;
}

.terminal-content pre code {
  @apply bg-transparent p-0;
}

/* Heading anchors */
.terminal-content h2,
.terminal-content h3,
.terminal-content h4 {
  @apply relative;
}

.terminal-content h2::before {
  content: '## ';
  @apply text-primary/50;
}

.terminal-content h3::before {
  content: '### ';
  @apply text-primary/50;
}

/* Terminal input styling */
input::placeholder {
  @apply text-muted-foreground/50;
}

/* Force pixel font for all terminal content */
.terminal-content {
  font-family: 'zpix', 'VT323', monospace !important;
}

.terminal-content p,
.terminal-content li,
.terminal-content td,
.terminal-content th,
.terminal-content blockquote {
  font-family: 'zpix', 'VT323', monospace !important;
}

.terminal-content h1,
.terminal-content h2,
.terminal-content h3,
.terminal-content h4,
.terminal-content h5,
.terminal-content h6 {
  font-family: 'zpix', 'VT323', monospace !important;
}

.terminal-content strong,
.terminal-content em,
.terminal-content a {
  font-family: inherit !important;
}
</style>
